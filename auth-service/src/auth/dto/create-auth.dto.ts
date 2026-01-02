import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}
