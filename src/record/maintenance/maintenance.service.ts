import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { RecordFilter } from '../dto/filter/record-filter';
import { MaintenanceListRecordResponse } from '../dto/maintenance-list-record-response';
import { MaintenanceRecordRequest } from '../dto/maintenance-record-request';
import { MaintenanceRecordResponse } from '../dto/maintenance-record-response';
import { MaintenancePart } from '../entities/maintenacnepart.entity';
import { Maintenance } from '../entities/maintenance.entity';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class MaintenanceService {
  @InjectRepository(Maintenance)
  private readonly maintenanceRepository: Repository<Maintenance>;

  async saveMaintenance(car: Car, request: MaintenanceRecordRequest) {
    const parts: MaintenancePart[] = request.parts.map((it) => {
      console.log(it);
      const part = new MaintenancePart();
      part.charge = +it.charge;
      part.title = it.name;
      return part;
    });

    const result = await this.maintenanceRepository.save({
      eventedAt: new Date(request.eventedAt),
      location: request.location,
      memo: request.memo,
      car,
      maintenancePart: parts,
    });
    return result;
  }

  async findAllMaintenance(car: Car, filter: RecordFilter) {
    //TODO - Filter Interceptor Transform 추가
    const start: Date = new Date(filter.date);
    const end: Date = new Date(filter.date);
    end.setMonth(1); //TODO JS-Date Library 검토
    const maintenances = await this.maintenanceRepository.find({
      where: {
        car,
        ...(filter.date && { eventedAt: Between(start, end) }),
      },
    });
    return maintenances.map((it) => new MaintenanceListRecordResponse(it));
  }

  async findlMaintenanceByid(car: Car, id: number) {
    const maintenance = await this.maintenanceRepository.findOneBy({
      car,
      id: id,
    });
    return new MaintenanceRecordResponse(maintenance);
  }

  async updateMaintenance(car: Car, distance: number, id: number) {
    const maintenance = await this.maintenanceRepository.findOneBy({
      car,
      id: id,
    });
    const updatedMaintenanceRecord = { ...maintenance, distance };
    return await this.maintenanceRepository.save(updatedMaintenanceRecord);
  }

  async deleteMaintenance(car: Car, id: number) {
    const result = await this.maintenanceRepository.softDelete({
      id: id,
      car,
    });
    return result.generatedMaps;
  }
}
