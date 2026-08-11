import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimelineEntryDto } from './dto/create-timeline-entry.dto';
import { UpdateTimelineEntryDto } from './dto/update-timeline-entry.dto';

@Injectable()
export class TimelineEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTimelineEntryDto) {
    return this.prisma.timelineEntry.create({ data: dto });
  }

  async findAll(userId?: string) {
    return this.prisma.timelineEntry.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' as const },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.timelineEntry.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`TimelineEntry ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateTimelineEntryDto) {
    await this.findOne(id);
    return this.prisma.timelineEntry.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.timelineEntry.delete({ where: { id } });
  }
}
