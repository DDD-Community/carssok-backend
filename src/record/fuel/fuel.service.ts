import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { FuelRecordRequest } from '../dto/fuel-record-request';
import { FuelRecordListResponse } from '../dto/fuel-list-record-response';
import { Fuel } from '../entities/fuel.entity';
import { FuelRecordResponse } from '../dto/fuel-record-response';
import { RecordFilter } from '../dto/filter/record-filter';

@Injectable()
export class FuelService {

    @InjectRepository(Fuel)
    private readonly fuelRepository: Repository<Fuel>

    async saveFuel(user: User, request: FuelRecordRequest) {
        const result = await this.fuelRepository.insert(
            {
                amount: request.amount, fuelType: request.fuelType, location: request.location,
                charge: request.charge, memo: request.memo, eventedAt: request.eventDate,
                user: user, price: request.price
            }
        );
        return { id: result.identifiers[0].id }
    }

    async findAllFuel(user: User, filter: RecordFilter) { //TODO - Filter Interceptor Transform 추가
        const start: Date = new Date(filter.date)
        const end: Date = new Date(filter.date)
        end.setMonth(1); //TODO JS-Date Library 검토
        const fuels = await this.fuelRepository.find({
            where: {
                user: user,
                ...( filter.date && { eventedAt: Between(start, end) } )
            }
        })
        return fuels.map(it => new FuelRecordListResponse(it))
    }

    async findFuelById(user: User, id: number) {
        const fuel = await this.fuelRepository.findOneBy({user: user, id: id})
        return new FuelRecordResponse(fuel)
    }

    async updateFuelById(user: User, id: number, request: Request) {
      
    }

    async deleteFuelById(user: User, id: number) {
        const result = await this.fuelRepository.softDelete({id: id, user: user})
        return result.generatedMaps
    }

}
