/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  private POST_SERVICE_URL = 'http://localhost:3003/posts';

  constructor(private readonly httpService: HttpService) {}

  // CREATE POST
  @Post()
  @ApiOperation({ summary: 'Create a new post via Gateway' })
  @ApiBody({ type: CreatePostDto })
  async create(
    @Body() createPostDto: CreatePostDto,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.POST_SERVICE_URL, createPostDto, {
          headers: { Authorization: authHeader },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data,
        error.response?.status || 500,
      );
    }
  }

  // GET ALL POSTS
  @Get()
  @ApiOperation({ summary: 'Get all posts via Gateway' })
  async findAll(@Headers('Authorization') authHeader: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.POST_SERVICE_URL, {
          headers: { Authorization: authHeader },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data,
        error.response?.status || 500,
      );
    }
  }

  // GET MY POSTS
  @Get('user/me')
  @ApiOperation({ summary: 'Get my posts via Gateway' })
  async findMyPosts(@Headers('Authorization') authHeader: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.POST_SERVICE_URL}/user/me`, {
          headers: { Authorization: authHeader },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data,
        error.response?.status || 500,
      );
    }
  }

  // GET ONE POST
  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID via Gateway' })
  async findOne(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.POST_SERVICE_URL}/${id}`, {
          headers: { Authorization: authHeader },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data,
        error.response?.status || 500,
      );
    }
  }

  // UPDATE POST
  @Patch(':id')
  @ApiOperation({ summary: 'Update post via Gateway' })
  @ApiBody({ type: UpdatePostDto })
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(
          `${this.POST_SERVICE_URL}/${id}`,
          updatePostDto,
          {
            headers: { Authorization: authHeader },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data,
        error.response?.status || 500,
      );
    }
  }

  // DELETE POST
  @Delete(':id')
  @ApiOperation({ summary: 'Delete post via Gateway' })
  async remove(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.POST_SERVICE_URL}/${id}`, {
          headers: { Authorization: authHeader },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data,
        error.response?.status || 500,
      );
    }
  }
}
