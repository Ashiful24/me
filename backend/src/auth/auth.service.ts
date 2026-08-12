import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomInt } from 'crypto';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtPayload } from './strategies/jwt.strategy';

const OTP_TTL_MS = 5 * 60 * 1000;
const FORGOT_GENERIC_MESSAGE =
  'If an account exists for that email, a reset code has been sent.';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
  ) {}

  private get accessExpiresIn(): string {
    return this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '1d';
  }

  private get refreshExpiresIn(): string {
    return this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '7d';
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private parseDurationMs(value: string): number {
    const match = /^(\d+)([smhd])$/i.exec(value.trim());
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000;
    }
    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };
    return amount * (multipliers[unit] ?? multipliers.d);
  }

  private toUserSummary(user: {
    id: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    role: string;
    status: string;
  }) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      role: user.role,
      status: user.status,
    };
  }

  private buildAccessPayload(user: {
    id: string;
    email: string;
    phoneNumber: string | null;
    role: string;
    status: string;
  }): JwtPayload {
    return {
      sub: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      status: user.status,
    };
  }

  private async issueTokens(user: {
    id: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    role: string;
    status: string;
  }) {
    const payload = this.buildAccessPayload(user);
    const accessExpiresIn = this.accessExpiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`;
    const refreshExpiresIn = this.refreshExpiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`;

    const accessToken = await this.jwt.signAsync(payload, {
      secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: accessExpiresIn,
    });

    const refreshToken = await this.jwt.signAsync(
      { sub: user.id },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: refreshExpiresIn,
      },
    );

    const expiresAt = new Date(
      Date.now() + this.parseDurationMs(this.refreshExpiresIn),
    );

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hashToken(refreshToken),
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.accessExpiresIn,
      user: this.toUserSummary(user),
    };
  }

  async login(dto: LoginDto) {
    const identifier = dto.emailOrPhone.trim();
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phoneNumber: identifier }],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is inactive');
    }

    return this.issueTokens(user);
  }

  async refresh(dto: RefreshDto) {
    let payload: { sub?: string };
    try {
      payload = await this.jwt.verifyAsync(dto.refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenHash = this.hashToken(dto.refreshToken);
    const stored = await this.prisma.refreshToken.findFirst({
      where: {
        userId: payload.sub,
        tokenHash,
        expiresAt: { gt: new Date() },
      },
    });

    if (!stored) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Invalid or inactive user');
    }

    await this.prisma.refreshToken.delete({ where: { id: stored.id } });
    return this.issueTokens(user);
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const valid = await compare(dto.previousPassword, user.password);
    if (!valid) {
      throw new BadRequestException('Previous password is incorrect');
    }

    const password = await hash(dto.newPassword, 10);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { password },
      }),
      this.prisma.refreshToken.deleteMany({ where: { userId } }),
    ]);

    return { message: 'Password updated successfully' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && user.status === 'ACTIVE') {
      const code = String(randomInt(100000, 1000000));
      const codeHash = this.hashToken(code);
      const expiresAt = new Date(Date.now() + OTP_TTL_MS);

      await this.prisma.passwordResetCode.create({
        data: {
          userId: user.id,
          codeHash,
          expiresAt,
        },
      });

      await this.mail.sendPasswordResetCode(user.email, code);
    }

    return { message: FORGOT_GENERIC_MESSAGE };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    const codeHash = this.hashToken(dto.code.trim());
    const reset = await this.prisma.passwordResetCode.findFirst({
      where: {
        userId: user.id,
        codeHash,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!reset) {
      throw new BadRequestException('Invalid or expired reset code');
    }

    const password = await hash(dto.newPassword, 10);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: user.id },
        data: { password },
      }),
      this.prisma.passwordResetCode.update({
        where: { id: reset.id },
        data: { usedAt: new Date() },
      }),
      this.prisma.refreshToken.deleteMany({ where: { userId: user.id } }),
    ]);

    return { message: 'Password reset successfully' };
  }
}
