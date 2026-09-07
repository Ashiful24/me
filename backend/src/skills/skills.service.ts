import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { resolveSkillVisuals } from './skill-icon.util';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSkillDto) {
    const visuals = resolveSkillVisuals(dto.title);
    return this.prisma.skill.create({
      data: {
        ...dto,
        iconKey: visuals.iconKey,
        color: visuals.color,
      },
      include: { detail: true, parent: true },
    });
  }

  async findAll(userId?: string, parentId?: string) {
    return this.prisma.skill.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(parentId ? { parentId } : {}),
      },
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
    const data = { ...dto };
    if (dto.title?.trim()) {
      Object.assign(data, resolveSkillVisuals(dto.title));
    }
    return this.prisma.skill.update({
      where: { id },
      data,
      include: { detail: true, parent: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.skill.delete({ where: { id } });
  }
}
