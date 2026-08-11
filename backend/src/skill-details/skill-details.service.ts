import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDetailDto } from './dto/create-skill-detail.dto';
import { UpdateSkillDetailDto } from './dto/update-skill-detail.dto';

@Injectable()
export class SkillDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSkillDetailDto) {
    return this.prisma.skillDetail.create({ data: dto });
  }

  async findAll(userId?: string) {
    return this.prisma.skillDetail.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: 'desc' as const },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.skillDetail.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`SkillDetail ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateSkillDetailDto) {
    await this.findOne(id);
    return this.prisma.skillDetail.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.skillDetail.delete({ where: { id } });
  }
}
