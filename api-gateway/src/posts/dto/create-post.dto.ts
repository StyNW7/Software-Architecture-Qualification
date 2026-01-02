import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post', description: 'Title of the post' })
  title: string;

  @ApiProperty({
    example: 'Hello World content...',
    description: 'Content of the post',
  })
  content: string;
}
