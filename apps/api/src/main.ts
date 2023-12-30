import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';

import { logger } from '@/utils/logger';

import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  app.enableVersioning({
    defaultVersion: VERSION_NEUTRAL,
    type: VersioningType.HEADER,
    header: 'accept-version',
  });

  app.use(compression());
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Credbull API')
    .setDescription('Backend api for Credbull services')
    .setVersion(process.env.APP_VERSION!)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.APP_PORT!);
})();
