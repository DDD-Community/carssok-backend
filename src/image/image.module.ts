import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './entities/image.entity';
import { Fuel } from 'src/record/entities/fuel.entity';
import { Accident } from 'src/record/entities/accident.entity';
import { Maintenance } from 'src/record/entities/maintenance.entity';
import { Run } from 'src/record/entities/run.entity';
import { Car } from 'src/car/entities/car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, Fuel, Accident, Maintenance, Run, Car]),
  ],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
