import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Car } from './entities/car.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Device } from 'src/user/entities/device.entity';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';
import { Record } from 'src/record/entities/record.entity';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';
import { CarListService } from './carlist.service';
import { CarListController } from './carlist.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      Model,
      Detail,
      Car,
      User,
      Device,
      Image,
      Record,
    ]),
  ],

  controllers: [CarController, CarListController],
  providers: [CarService, UserService, ImageService, CarListService],
})
export class CarModule {}
