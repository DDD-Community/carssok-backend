import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../brand/entities/brand.entity';
import { Model } from '../brand/entities/model.entity';
import { Detail } from '../brand/entities/detail.entity';
import { Car } from './entities/car.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Device } from 'src/user/entities/device.entity';
import { UserCar } from 'src/user/entities/user_car.entity';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      Model,
      Detail,
      Car,
      User,
      Device,
      UserCar,
      Image,
    ]),
  ],
  controllers: [CarController],
  providers: [CarService, UserService, SimpleAuthGuard, ImageService],
})
export class CarModule {}
