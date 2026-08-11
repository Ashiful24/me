import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: dto,
      include: { highlights: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async findAll(userId?: string) {
    return this.prisma.experience.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' as const },
      include: { highlights: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.experience.findUnique({
      where: { id },
      include: { highlights: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!item) {
      throw new NotFoundException(`Experience ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateExperienceDto) {
    await this.findOne(id);
    return this.prisma.experience.update({
      where: { id },
      data: dto,
      include: { highlights: { orderBy: { sortOrder: 'asc' } } },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.experience.delete({ where: { id } });
  }
}
