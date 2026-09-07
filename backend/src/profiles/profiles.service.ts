import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {
  AVATAR_URL_PREFIX,
  RESUME_URL_PREFIX,
  deleteUploadedFile,
} from '../uploads/upload-paths';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId?: string) {
    return this.prisma.profile.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Profile ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateProfileDto) {
    await this.findOne(id);
    return this.prisma.profile.update({ where: { id }, data: dto });
  }

  async uploadAvatar(id: string, file: Express.Multer.File | undefined) {
    if (!file) {
      throw new BadRequestException('Avatar file is required');
    }
    const profile = await this.findOne(id);
    const nextUrl = `${AVATAR_URL_PREFIX}/${file.filename}`;
    deleteUploadedFile(profile.avatarUrl);
    return this.prisma.profile.update({
      where: { id },
      data: { avatarUrl: nextUrl },
    });
  }

  async uploadResume(id: string, file: Express.Multer.File | undefined) {
    if (!file) {
      throw new BadRequestException('Resume/CV file is required');
    }
    const profile = await this.findOne(id);
    const nextUrl = `${RESUME_URL_PREFIX}/${file.filename}`;
    deleteUploadedFile(profile.resumeUrl);
    return this.prisma.profile.update({
      where: { id },
      data: { resumeUrl: nextUrl },
    });
  }
}
