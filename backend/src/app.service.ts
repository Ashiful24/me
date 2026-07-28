import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello() {
    return {
      name: 'ashiful-portfolio-api',
      status: 'running',
    };
  }

  async getHealth() {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      api: 'ok',
      database: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
