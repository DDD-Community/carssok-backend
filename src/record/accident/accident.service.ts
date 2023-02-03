import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AccidentListResponse } from '../dto/accident-list-record-response';
import { AccidentRecordResponse } from '../dto/accident-record-response';
import { RecordFilter } from '../dto/filter/record-filter';
import { Accident } from '../entities/accident.entity';
import { Car } from 'src/car/entities/car.entity';
import { AccidentRecordRequest } from '../dto/accident-record-request';

@Injectable()
export class AccidentService {
  @InjectRepository(Accident)
  private readonly accidentRepository: Repository<Accident>;

  async saveAccident(
    car: Car,
    eventedAt: Date,
    rest: Omit<AccidentRecordRequest, 'carId' | 'eventedAt'>,
  ) {
    const result = await this.accidentRepository.save({
      ...rest,
      eventedAt,
      car,
    });
    return result;
  }

  async findAllAccident(
    car: Car,
    filter: RecordFilter,
  ): Promise<AccidentListResponse[]> {
    //TODO - Filter Interceptor Transform 추가
    const start: Date = new Date(filter.date);
    const end: Date = new Date(filter.date);
    end.setMonth(1); //TODO JS-Date Library 검토
    const accidents = await this.accidentRepository.findBy({
      car,
      ...(filter.date && { eventedAt: Between(start, end) }),
    });
    return accidents.map((it) => new AccidentListResponse(it));
  }

  async findAccidnetByid(id: number) {
    const accident = await this.accidentRepository.findOneBy({
      id,
    });
    return new AccidentRecordResponse(accident);
  }

  async updateAccidentById(
    id: number,
    rest: Omit<AccidentRecordRequest, 'carId' | 'eventedAt'>,
  ) {
    const accident = await this.accidentRepository.findOneBy({ id });
    const updatedAccidentRecord = { ...accident, ...rest };
    await this.accidentRepository.save(updatedAccidentRecord);
    return updatedAccidentRecord;
  }

  async deleteAccidentById(id: number) {
    const result = await this.accidentRepository.softDelete(id);
    return result.generatedMaps;
  }
}
