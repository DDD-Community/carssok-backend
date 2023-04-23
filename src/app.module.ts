import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimpleAuthMiddleware } from './simple-auth/simple-auth.middleware';
import { UserModule } from './user/user.module';
import { SimpleAuthModule } from './simple-auth/simple-auth.module';
import { RecordModule } from './record/record.module';
import { CarModule } from './car/car.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';

type envType = 'production' | 'test' | 'development';
const env: envType = (process.env.NODE_ENV || 'development') as envType;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query', 'warn', 'error'],
    }),
    CarModule,
    ConfigModule,
    UserModule,
    SimpleAuthModule,
    RecordModule,
  ],
  providers: [
    UserModule,
    RecordModule,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SimpleAuthMiddleware)
      .exclude({
        path: '/auth',
        method: RequestMethod.POST,
      })
      .forRoutes('*');
  }
}
