import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactLinkDto } from './dto/create-contact-link.dto';
import { UpdateContactLinkDto } from './dto/update-contact-link.dto';

@Injectable()
export class ContactLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactLinkDto) {
    return this.prisma.contactLink.create({ data: dto });
  }

  async findAll(userId?: string) {
    return this.prisma.contactLink.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { sortOrder: 'asc' as const },
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
    await this.findOne(id);
    return this.prisma.contactLink.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.contactLink.delete({ where: { id } });
  }
}
