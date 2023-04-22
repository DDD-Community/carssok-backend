import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './utils/winston.util';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './common/sentry.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  // Sentry.init({
  //   dsn: process.env.SENTRY_DSN,
  // });
  // app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
