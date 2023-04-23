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

  async findFuel() {
    return await this.fuelRepository.findOne({
      where: {},
      select: {
        eventedAt: true,
        location: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllFuel(car: Car, filter: RecordFilter) {
    const [start, end] = filter.getOneMonthRange();
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
