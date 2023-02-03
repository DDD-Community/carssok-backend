import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/user/entities/device.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Accident } from './entities/accident.entity';
import { Fuel } from './entities/fuel.entity';
import { Maintenance } from './entities/maintenance.entity';
import { Run } from './entities/run.entity';
import { RunService } from './run/run.service';
import { RunController } from './run/run.controller';
import { FuelController } from './fuel/fuel.controller';
import { FuelService } from './fuel/fuel.service';
import { AccidentController } from './accident/accident.controller';
import { AccidentService } from './accident/accident.service';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { Car } from 'src/car/entities/car.entity';
import { CarService } from 'src/car/car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accident,
      Fuel,
      Maintenance,
      Run,
      User,
      Device,
      Image,
      Car,
    ]),
  ],
  controllers: [FuelController, RunController, AccidentController],
  providers: [
    UserService,
    FuelService,
    RunService,
    AccidentService,
    ImageService,
    CarService,
  ],
  exports: [FuelService, RunService],
})
export class RecordModule {}
