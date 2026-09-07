import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactLinkDto } from './dto/create-contact-link.dto';
import { UpdateContactLinkDto } from './dto/update-contact-link.dto';
import { resolveContactVisuals } from './contact-icon.util';

@Injectable()
export class ContactLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactLinkDto) {
    const visuals = resolveContactVisuals(dto.label, dto.href);
    return this.prisma.contactLink.create({
      data: {
        ...dto,
        iconKey: visuals.iconKey,
        color: visuals.color,
      },
    });
  }

  async findAll(userId?: string) {
    return this.prisma.contactLink.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.contactLink.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`ContactLink ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateContactLinkDto) {
    const existing = await this.findOne(id);
    const label = dto.label?.trim() || existing.label;
    const href = dto.href?.trim() || existing.href;
    const visuals =
      dto.label !== undefined || dto.href !== undefined
        ? resolveContactVisuals(label, href)
        : null;

    return this.prisma.contactLink.update({
      where: { id },
      data: {
        ...dto,
        ...(visuals ?? {}),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.contactLink.delete({ where: { id } });
  }
}
