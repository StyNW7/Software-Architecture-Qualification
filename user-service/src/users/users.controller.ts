import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // SYNC ENDPOINT
  @Post('sync')
  @ApiOperation({ summary: 'Internal: Sync user from Auth Service' })
  create(@Body() createUserDto: CreateUserDto) {
    console.log('Syncing user:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  // GET ALL USERS
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  // GET ONE USER (Protected)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
