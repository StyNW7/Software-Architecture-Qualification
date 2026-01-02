/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  // --- REGISTER USER ---
  async register(createAuthDto: CreateAuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: createAuthDto.username },
    });
    if (existingUser) throw new BadRequestException('Username already exists');

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: createAuthDto.username,
        password: hashedPassword,
      },
    });

    try {
      await firstValueFrom(
        this.httpService.post('http://localhost:3002/users/sync', {
          id: newUser.id,
          username: newUser.username,
        }),
      );
    } catch (error) {
      console.error(
        'Failed to sync with User Service. Is it running?',
        error.message,
      );
    }

    return { message: 'User registered successfully', userId: newUser.id };
  }

  // --- LOGIN USER ---
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: loginAuthDto.username },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
