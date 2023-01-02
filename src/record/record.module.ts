import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accident } from './entities/accident.entity';
import { Fuel } from './entities/fuel.entity';
import { Maintenance } from './entities/maintenance.entity';
import { Run } from './entities/run.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
    imports: [TypeOrmModule.forFeature([Accident, Fuel, Maintenance, Run])],
    controllers: [RecordController],
    providers: [RecordService],
    exports: [RecordService],
  })
export class RecordModule {}
