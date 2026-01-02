import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AuthController, UsersController, PostsController],
  providers: [],
})
export class AppModule {}
