/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    // Extract userId from the JWT Token
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get('user/me')
  @ApiOperation({ summary: 'Get posts created by current user' })
  findMyPosts(@Request() req) {
    return this.postsService.findByUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update post' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
