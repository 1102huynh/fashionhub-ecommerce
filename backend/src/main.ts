import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:4321', 'http://localhost:3000'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Fixed port - no fallback to avoid random ports
  const port = 3001;
  await app.listen(port);

  console.log(`🚀 FashionHub Backend running on: http://localhost:${port}`);
  console.log(`📡 API available at: http://localhost:${port}/api`);
}

bootstrap();

