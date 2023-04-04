import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { RecordFilter } from '../dto/filter/record-filter';
import { RunRecordResponse } from '../dto/run-record-response';
import { Run } from '../entities/run.entity';
import { Car } from 'src/car/entities/car.entity';
import { RunRecordRequest } from '../dto/run-record-request';

@Injectable()
export class RunService {
  @InjectRepository(Run)
  private readonly runRepository: Repository<Run>;

  async saveRun(
    rest: Omit<RunRecordRequest, 'eventedAt'>,
    car: Car,
    eventedAt: Date,
  ) {
    const result = await this.runRepository.save({
      ...rest,
      eventedAt,
      car,
    });
    return result;
  }

  async findAccumulateDistance(car: Car): Promise<object> {
    const result = await this.runRepository
      .createQueryBuilder('run')
      .select('IFNULL(SUM(run.distance), 0)', 'distance')
      .where('run.carId = :id', { id: car.id })
      .getRawOne();
    result.distance = parseInt(result.distance);
    return result;
  }

  async findAllRun(car: Car, filter: RecordFilter) {
    //TODO - Filter Interceptor Transform 추가
    const start: Date = new Date(filter.date);
    const end: Date = new Date(filter.date);
    end.setMonth(1); //TODO JS-Date Library 검토
    const runs = await this.runRepository.findBy({
      car: { id: car.id },
      ...(filter.date && { eventedAt: Between(start, end) }),
    });
    return runs.map((it) => new RunRecordResponse(it));
  }

  async updateRun(distance: number, id: number, car: Car) {
    const run = await this.runRepository.findOneBy({
      id,
      car: { id: car['id'] },
    });
    const updatedRunRecord = { ...run, distance };

    return await this.runRepository.save(updatedRunRecord);
  }

  async deleteRun(car: Car, id: number) {
    const record = await this.runRepository.findOne({
      where: { id, car: { id: car['id'] } },
    });
    const result = await this.runRepository.softDelete(record);
    return result.generatedMaps;
  }
}
