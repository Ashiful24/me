import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProfileDto) {
    return this.prisma.profile.create({ data: dto });
  }

  async findAll(userId?: string) {
    return this.prisma.profile.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' as const },
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

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.profile.delete({ where: { id } });
  }
}
