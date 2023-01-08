import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/user/entities/device.entity';
import { User } from 'src/user/entities/user.entity';
import { UserCar } from 'src/user/entities/user_car.entity';
import { UserService } from 'src/user/user.service';
import { Accident } from './entities/accident.entity';
import { Fuel } from './entities/fuel.entity';
import { Maintenance } from './entities/maintenance.entity';
import { Run } from './entities/run.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
    imports: [TypeOrmModule.forFeature([Accident, Fuel, Maintenance, Run, User, Device, UserCar])],
    controllers: [RecordController],
    providers: [RecordService, UserService],
    exports: [RecordService],
  })
export class RecordModule {}
