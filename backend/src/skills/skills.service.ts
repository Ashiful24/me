import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSkillDto) {
    return this.prisma.skill.create({
      data: dto,
      include: { detail: true, parent: true },
    });
  }

  async findAll(userId?: string) {
    return this.prisma.skill.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' as const },
      include: { detail: true, parent: true },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.skill.findUnique({
      where: { id },
      include: { detail: true, parent: true },
    });
    if (!item) {
      throw new NotFoundException(`Skill ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateSkillDto) {
    await this.findOne(id);
    return this.prisma.skill.update({
      where: { id },
      data: dto,
      include: { detail: true, parent: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.skill.delete({ where: { id } });
  }
}
