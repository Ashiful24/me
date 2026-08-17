import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceHighlightDto } from './dto/create-experience-highlight.dto';
import { UpdateExperienceHighlightDto } from './dto/update-experience-highlight.dto';

@Injectable()
export class ExperienceHighlightsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExperienceHighlightDto) {
    return this.prisma.experienceHighlight.create({ data: dto });
  }

  async findAll(userId?: string, experienceId?: string) {
    return this.prisma.experienceHighlight.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(experienceId ? { experienceId } : {}),
      },
      orderBy: { sortOrder: 'asc' as const },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.experienceHighlight.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`ExperienceHighlight ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateExperienceHighlightDto) {
    await this.findOne(id);
    return this.prisma.experienceHighlight.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.experienceHighlight.delete({ where: { id } });
  }
}
