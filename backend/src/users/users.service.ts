import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

function omitPassword<T extends { password?: string }>(user: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safe } = user;
  return safe;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return users.map(omitPassword);
  }

  async findOne(id: string) {
    const item = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return omitPassword(item);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: { username: dto.username },
    });
    return omitPassword(user);
  }
}
