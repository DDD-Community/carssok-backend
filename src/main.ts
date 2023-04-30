import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './utils/winston.util';
import * as Sentry from '@sentry/node';
import { ValidationPipe } from '@nestjs/common';
import { SentryInterceptor } from './common/interceptor/sentry.interceptor';
import { CommonExceptionFilter } from './common/filter/common-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
  app.useGlobalInterceptors(new SentryInterceptor());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CommonExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false }),
  );
  await app.listen(3000);
}
bootstrap();
