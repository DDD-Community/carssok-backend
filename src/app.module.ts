import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloController } from './hello/hello.controller';
import { SimpleAuthMiddleware } from './simple-auth/simple-auth.middleware';
import { Device } from './user/entities/device.entity';
import { User } from './user/entities/user.entity';
import { UserCar } from './user/entities/user_car.entity';
import { UserModule } from './user/user.module';
import { SimpleAuthModule } from './simple-auth/simple-auth.module';
import { SimpleAuthController } from './simple-auth/simple-auth.controller';

type envType = "production" | "test" | "development"
const env :envType = (process.env.NODE_ENV || "development") as envType

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [User, UserCar, Device], //TODO entity 페스 안먹음
      synchronize: false,
      logging: ["query"],
    }),
    ConfigModule,
    UserModule,
    SimpleAuthModule
  ],
  controllers: [HelloController, SimpleAuthController],
  providers: [UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SimpleAuthMiddleware)
      .forRoutes(HelloController)
  }
}
