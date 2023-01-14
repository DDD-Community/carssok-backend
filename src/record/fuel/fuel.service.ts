import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { FuelRecordRequest } from '../dto/fuel-record-request';
import { Fuel } from '../entities/fuel.entity';

@Injectable()
export class FuelService {

    @InjectRepository(Fuel)
    private readonly fuelRepository: Repository<Fuel>

    async saveFuel(user: User, request: FuelRecordRequest) {
        return await this.fuelRepository.insert(
            {
                amount: request.amount, fuelType: request.fuelType, location: request.location,
                charge: request.charge, memo: request.memo, eventedAt: request.eventDate,
                user: user
            }
        );
    }

    async findAllFuel(user: User, filter: any) {
        return await this.fuelRepository.find({
            where: {
                user: user,
                ...( filter.date && { eventedAt: Between(filter.date, filter.date.setMonth(filter.date.getMonth())) } )
            }
        })
    }

    async findFuelById(user: User, id: number) {
        return await this.fuelRepository.findOneBy({user: user, id: id})
    }

    async updateFuelById(user: User, id: number, request: Request) {
        // update방식 JS 처리방식 차용할 예정
    }

    async deleteFuelById(user: User, id: number) {
        return await this.fuelRepository.softDelete({id: id, user: user})
    }

}
