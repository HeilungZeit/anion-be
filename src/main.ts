import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  await app.listen(3001);
}
bootstrap();
