/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private AUTH_SERVICE_URL = 'http://localhost:3001/auth';

  constructor(private readonly httpService: HttpService) {}

  // REGISTER
  @Post('register')
  @ApiOperation({ summary: 'Register via Gateway' })
  @ApiBody({ type: CreateAuthDto })
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.AUTH_SERVICE_URL}/register`,
          createAuthDto,
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

  // LOGIN
  @Post('login')
  @ApiOperation({ summary: 'Login via Gateway' })
  @ApiBody({ type: LoginAuthDto })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.AUTH_SERVICE_URL}/login`, loginAuthDto),
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
