import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: dto,
      include: { tags: true, credentials: true },
    });
  }

  async findAll(userId?: string) {
    return this.prisma.project.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' as const },
      include: { tags: true, credentials: true },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.project.findUnique({
      where: { id },
      include: { tags: true, credentials: true },
    });
    if (!item) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: { id },
      data: dto,
      include: { tags: true, credentials: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({ where: { id } });
  }
}
