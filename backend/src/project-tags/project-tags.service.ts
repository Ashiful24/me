import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectTagDto } from './dto/create-project-tag.dto';
import { UpdateProjectTagDto } from './dto/update-project-tag.dto';

@Injectable()
export class ProjectTagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectTagDto) {
    return this.prisma.projectTag.create({ data: dto });
  }

  async findAll(userId?: string, projectId?: string) {
    return this.prisma.projectTag.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(projectId ? { projectId } : {}),
      },
      orderBy: { createdAt: 'desc' as const },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.projectTag.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`ProjectTag ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateProjectTagDto) {
    await this.findOne(id);
    return this.prisma.projectTag.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.projectTag.delete({ where: { id } });
  }
}
