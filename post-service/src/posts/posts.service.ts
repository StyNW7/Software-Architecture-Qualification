import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaClient) {}

  // CREATE POST
  async create(createPostDto: CreatePostDto, userId: number) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        userId: userId,
      },
    });
  }

  // GET ALL POSTS
  findAll() {
    return this.prisma.post.findMany();
  }

  // GET POST BY ID
  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  // GET POST BY USER
  findByUser(userId: number) {
    return this.prisma.post.findMany({
      where: { userId: userId },
    });
  }

  // UPDATE POST
  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  // DELETE POST
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
