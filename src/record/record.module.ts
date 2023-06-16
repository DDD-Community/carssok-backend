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
import { MaintenanceService } from './maintenance/maintenance.service';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { MaintenancePart } from './entities/maintenacnepart.entity';
import { MaintenanceTime } from './entities/maintenancetime.entity';
import { RecordController } from './record.controller';
import { Detail } from 'src/car/entities/detail.entity';
import { Brand } from 'src/car/entities/brand.entity';
import { Model } from 'src/car/entities/model.entity';
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
      Detail,
      Brand,
      Model,
      Car,
      MaintenancePart,
      MaintenanceTime,
    ]),
  ],
  controllers: [
    FuelController,
    RunController,
    AccidentController,
    MaintenanceController,
    RecordController,
  ],
  providers: [
    UserService,
    FuelService,
    RunService,
    AccidentService,
    ImageService,
    CarService,
    MaintenanceService,
  ],
  exports: [FuelService, RunService],
})
export class RecordModule {}
