import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { FuelRecordRequest } from '../dto/fuel-record-request';
import { FuelRecordListResponse } from '../dto/fuel-list-record-response';
import { Fuel } from '../entities/fuel.entity';
import { FuelRecordResponse } from '../dto/fuel-record-response';

@Injectable()
export class FuelService {

    @InjectRepository(Fuel)
    private readonly fuelRepository: Repository<Fuel>

    async saveFuel(user: User, request: FuelRecordRequest) {
        const result = await this.fuelRepository.insert(
            {
                amount: request.amount, fuelType: request.fuelType, location: request.location,
                charge: request.charge, memo: request.memo, eventedAt: request.eventDate,
                user: user
            }
        );
        return result.identifiers
    }

    async findAllFuel(user: User, filter: any) {
        const fuels = await this.fuelRepository.find({
            where: {
                user: user,
                ...( filter.date && { eventedAt: Between(filter.date, filter.date.setMonth(filter.date.getMonth())) } )
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
