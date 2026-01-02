/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Controller,
  Get,
  Param,
  Headers,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  private USER_SERVICE_URL = 'http://localhost:3002/users';

  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users via Gateway' })
  async findAll(@Headers('Authorization') authHeader: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.USER_SERVICE_URL, {
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

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID via Gateway' })
  async findOne(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.USER_SERVICE_URL}/${id}`, {
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
