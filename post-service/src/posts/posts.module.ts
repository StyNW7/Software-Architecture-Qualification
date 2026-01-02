import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaClient } from '@prisma/client';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaClient, JwtStrategy],
})
export class PostsModule {}
