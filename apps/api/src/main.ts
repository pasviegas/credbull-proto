import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';

import { logger } from '@/utils/logger';

import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  app.use(compression());
  app.use(helmet());

  await app.listen(process.env.PORT!);
})();
