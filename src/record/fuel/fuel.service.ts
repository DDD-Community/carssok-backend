import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { FuelRecordListResponse } from '../dto/fuel-list-record-response';
import { Fuel } from '../entities/fuel.entity';
import { FuelRecordResponse } from '../dto/fuel-record-response';
import { RecordFilter } from '../dto/filter/record-filter';
import { Car } from 'src/car/entities/car.entity';
import { FuelRecordRequest } from '../dto/fuel-record-request';

@Injectable()
export class FuelService {
  @InjectRepository(Fuel)
  private readonly fuelRepository: Repository<Fuel>;
  @InjectRepository(Car)
  private readonly carRepository: Repository<Car>;

  async saveFuel(
    car: Car,
    eventedAt: Date,
    rest: Omit<FuelRecordRequest, 'eventedAt'>,
  ) {
    const result = await this.fuelRepository.save({ car, eventedAt, ...rest });
    return result;
  }

  async findAllFuel(car: Car, filter: RecordFilter) {
    //TODO - Filter Interceptor Transform 추가
    const start: Date = new Date(filter.date);
    const end: Date = new Date(filter.date);
    end.setMonth(1); //TODO JS-Date Library 검토

    const fuels = await this.fuelRepository.findBy({
      car: { id: car.id },
      ...(filter.date && { eventedAt: Between(start, end) }),
    });
    return fuels.map((it) => new FuelRecordListResponse(it));
  }

  async findFuelById(id: number, car: Car) {
    const fuel = await this.fuelRepository.findOneBy({
      id,
      car: { id: car['id'] },
    });

    return new FuelRecordResponse(fuel);
  }

  async updateFuelById(
    car: Car,
    id: number,
    rest: Omit<FuelRecordRequest, 'eventedAt'>,
    eventedAt,
  ) {
    const fuel = await this.fuelRepository.findOne({
      where: { id, car: { id: car['id'] } },
    });
    const updatedFuel = { ...fuel, ...rest, eventedAt };
    await this.fuelRepository.save(updatedFuel);
    return updatedFuel;
  }

  async deleteFuelById(id: number, car: Car) {
    const record = await this.fuelRepository.findOne({
      where: { car: { id: car['id'] }, id },
    });
    const result = await this.fuelRepository.softDelete(record.id);
    return result.generatedMaps;
  }
}
