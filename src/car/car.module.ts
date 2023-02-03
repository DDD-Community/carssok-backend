import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../crawler/entities/brand.entity';
import { Model } from '../crawler/entities/model.entity';
import { Detail } from '../crawler/entities/detail.entity';
import { Car } from './entities/car.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Device } from 'src/user/entities/device.entity';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';
import { CrawlerService } from 'src/crawler/crawler.service';
import { Record } from 'src/record/entities/record.entity';

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

  controllers: [CarController],
  providers: [CarService, UserService, ImageService, CrawlerService],
})
export class CarModule {}
