// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Opcionalmente, para restringir orígenes:
  // app.enableCors({
  //   origin: 'http://localhost:5173',
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
