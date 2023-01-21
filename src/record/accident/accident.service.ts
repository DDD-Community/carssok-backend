import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { AccidentListResponse } from '../dto/accident-list-record-response';
import { AccidentRecordRequest } from '../dto/accident-record-request';
import { AccidentRecordResponse } from '../dto/accident-record-response';
import { RecordFilter } from '../dto/record-filter';
import { Accident } from '../entities/accident.entity';

@Injectable()
export class AccidentService {

    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>

    async saveAccident(user: User, request: AccidentRecordRequest, files: Express.Multer.File[]) {
        console.log(files, request)
        // const result = await this.accidentRepository.insert({
        //     user: user
        // })
    }

    async findAllAccident(user: User, filter: RecordFilter): Promise<AccidentListResponse[]> { //TODO - Filter Interceptor Transform 추가
        const start: Date = new Date(filter.date)
        const end: Date = new Date(filter.date)
        end.setMonth(1); //TODO JS-Date Library 검토
        const accidents = await this.accidentRepository.find({
            where: {
                user: user,
                ...( filter.date && { eventedAt: Between(start, end) } )
            }
        })
        return accidents.map(it => new AccidentListResponse(it));
    }

    async findAccidnetByid(user: User, id: number) {
        const accident = await this.accidentRepository.findOneBy({user: user, id: id})
        return new AccidentRecordResponse(accident);
    }

    async updateAccidentById(user: User, id: number, request) {

    }

    async deleteAccidentById(user: User, id: number) {
        const result = await this.accidentRepository.softDelete({id: id, user: user})
        return result.generatedMaps
    }
}
