import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { RecordFilter } from '../dto/filter/record-filter';
import { MaintenanceListRecordResponse } from '../dto/maintenance-list-record-response';
import { MaintenanceRecordRequest } from '../dto/maintenance-record-request';
import { MaintenanceRecordResponse } from '../dto/maintenance-record-response';
import { Maintenance } from '../entities/maintenance.entity';
import { Car } from 'src/car/entities/car.entity';
import { MaintenancePart } from '../entities/maintenacnepart.entity';
import { RunService } from '../run/run.service';

@Injectable()
export class MaintenanceService {
  @InjectRepository(Maintenance)
  private readonly maintenanceRepository: Repository<Maintenance>;
  @Inject()
  private readonly runService: RunService;

  async saveMaintenance(car: Car, request: MaintenanceRecordRequest) {
    const distanceForBuy = await this.runService.findAccumulateDistance(car);
    const maintenance = this.toMaintenace(car, request, distanceForBuy);
    const result = await this.maintenanceRepository.save(maintenance);
    return result;
  }

  private toMaintenace(car: Car, request: MaintenanceRecordRequest, distanceForBuy): Maintenance {
    const parts: MaintenancePart[] = request.parts.map((it) => {
      const part = new MaintenancePart();
      part.charge = it.charge;
      part.title = it.title;
      part.distanceForBuy = distanceForBuy.distance;
      return part;
    });
    const maintenance = new Maintenance();
    maintenance.maintenancePart = request.parts;
    maintenance.eventedAt = new Date(request.eventedAt);
    maintenance.location = request.location;
    maintenance.memo = request.memo;
    maintenance.car = car;
    maintenance.maintenancePart = parts;
    return maintenance
  }

  async findAllMaintenance(car: Car, filter: RecordFilter) { //TODO - Filter Interceptor Transform 추가
    const start: Date = new Date(filter.date);
    const end: Date = new Date(filter.date);
    end.setMonth(1); //TODO JS-Date Library 검토
    const maintenances = await this.maintenanceRepository.find({
      relations: {
        maintenancePart: true
      },
      where: {
        car: {id: car.id},
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
