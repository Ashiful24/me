import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicPortfolio(username?: string) {
    const user = username
      ? await this.prisma.user.findUnique({ where: { username } })
      : await this.prisma.user.findFirst({
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'asc' },
        });

    if (!user) {
      throw new NotFoundException('Portfolio user not found');
    }

    const userId = user.id;

    const [
      profile,
      stats,
      projects,
      experiences,
      services,
      timelineEntries,
      testimonials,
      contactLinks,
      skillGroups,
    ] = await Promise.all([
      this.prisma.profile.findUnique({ where: { userId } }),
      this.prisma.stat.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.project.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
        include: { tags: true, credentials: true },
      }),
      this.prisma.experience.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
        include: { highlights: { orderBy: { sortOrder: 'asc' } } },
      }),
      this.prisma.service.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.timelineEntry.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.testimonial.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.contactLink.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
      }),
      this.prisma.skillGroup.findMany({
        where: { userId },
        orderBy: { sortOrder: 'asc' },
        include: {
          skills: {
            orderBy: { sortOrder: 'asc' },
            include: { detail: true },
          },
        },
      }),
    ]);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      profile,
      stats,
      projects,
      experiences,
      services,
      timelineEntries,
      testimonials,
      contactLinks,
      skillGroups,
    };
  }
}
