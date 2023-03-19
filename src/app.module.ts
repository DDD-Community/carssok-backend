import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimpleAuthMiddleware } from './simple-auth/simple-auth.middleware';
import { Device } from './user/entities/device.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { SimpleAuthModule } from './simple-auth/simple-auth.module';
import { RecordModule } from './record/record.module';
import { Accident } from './record/entities/accident.entity';
import { Run } from './record/entities/run.entity';
import { Maintenance } from './record/entities/maintenance.entity';
import { Fuel } from './record/entities/fuel.entity';
import { CarModule } from './car/car.module';
import { Brand } from './car/entities/brand.entity';
import { Car } from './car/entities/car.entity';
import { Image } from './image/entities/image.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { MaintenancePart } from './record/entities/maintenacnepart.entity';
import { Model } from './car/entities/model.entity';
import { Detail } from './car/entities/detail.entity';

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
      entities: [
        User,
        Device,
        Accident,
        Fuel,
        Run,
        Maintenance,
        Brand,
        Car,
        Model,
        Detail,
        Image,
        MaintenancePart,
      ],

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
