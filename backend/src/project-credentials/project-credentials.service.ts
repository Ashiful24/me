import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectCredentialDto } from './dto/create-project-credential.dto';
import { UpdateProjectCredentialDto } from './dto/update-project-credential.dto';

@Injectable()
export class ProjectCredentialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectCredentialDto) {
    return this.prisma.projectCredential.create({ data: dto });
  }

  async findAll(userId?: string, projectId?: string) {
    return this.prisma.projectCredential.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(projectId ? { projectId } : {}),
      },
      orderBy: { createdAt: 'desc' as const },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.projectCredential.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`ProjectCredential ${id} not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateProjectCredentialDto) {
    await this.findOne(id);
    return this.prisma.projectCredential.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.projectCredential.delete({ where: { id } });
  }
}
