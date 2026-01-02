import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 1, description: 'ID from Auth Service' })
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'Username from Auth Service',
  })
  username: string;
}
