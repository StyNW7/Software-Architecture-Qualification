import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('The Auth Service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  // Use Port from ENV or default to 3001
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
