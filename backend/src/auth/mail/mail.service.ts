import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null;

  constructor(private readonly config: ConfigService) {
    const host = config.get<string>('SMTP_HOST');
    const user = config.get<string>('SMTP_USER');
    const pass = config.get<string>('SMTP_PASS');

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: Number(config.get('SMTP_PORT') ?? 587),
        secure: false,
        auth: { user, pass },
      });
    } else {
      this.transporter = null;
      this.logger.warn(
        'SMTP not configured — password reset codes will be logged only',
      );
    }
  }

  async sendPasswordResetCode(to: string, code: string): Promise<void> {
    const from =
      this.config.get<string>('SMTP_FROM') ??
      'Portfolio <noreply@example.com>';
    const subject = 'Password reset code';
    const text = `Your password reset code is ${code}. It expires in 5 minutes.`;
    const html = `<p>Your password reset code is <strong>${code}</strong>.</p><p>It expires in 5 minutes.</p>`;

    if (!this.transporter) {
      this.logger.log(`[dev] Password reset code for ${to}: ${code}`);
      return;
    }

    await this.transporter.sendMail({ from, to, subject, text, html });
  }
}
