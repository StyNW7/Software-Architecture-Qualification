import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  // SYNC USER
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        id: createUserDto.id,
        username: createUserDto.username,
      },
    });
  }

  // GET ALL USERS
  findAll() {
    return this.prisma.user.findMany();
  }

  // GET USER BY ID
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
