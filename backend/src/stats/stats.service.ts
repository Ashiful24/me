import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStatDto) {
    return this.prisma.stat.create({ data: dto });
  }

  async findAll(userId?: string) {
    return this.prisma.stat.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' as const },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.stat.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Stat ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateStatDto) {
    await this.findOne(id);
    return this.prisma.stat.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.stat.delete({ where: { id } });
  }
}
