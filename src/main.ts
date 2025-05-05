// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
