import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Relax BE')
    .setDescription('Relax BE Documentation')
    //.addCookieAuth(REFRESH_TOKEN_COOKIE)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
}
