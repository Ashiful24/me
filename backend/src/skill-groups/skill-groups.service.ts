import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillGroupDto } from './dto/create-skill-group.dto';
import { UpdateSkillGroupDto } from './dto/update-skill-group.dto';

@Injectable()
export class SkillGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSkillGroupDto) {
    return this.prisma.skillGroup.create({
      data: dto,
      include: {
        skills: { orderBy: { sortOrder: 'asc' }, include: { detail: true } },
      },
    });
  }

  async findAll(userId?: string) {
    return this.prisma.skillGroup.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' as const },
      include: {
        skills: { orderBy: { sortOrder: 'asc' }, include: { detail: true } },
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.skillGroup.findUnique({
      where: { id },
      include: {
        skills: { orderBy: { sortOrder: 'asc' }, include: { detail: true } },
      },
    });
    if (!item) {
      throw new NotFoundException(`SkillGroup ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateSkillGroupDto) {
    await this.findOne(id);
    return this.prisma.skillGroup.update({
      where: { id },
      data: dto,
      include: {
        skills: { orderBy: { sortOrder: 'asc' }, include: { detail: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.skillGroup.delete({ where: { id } });
  }
}
