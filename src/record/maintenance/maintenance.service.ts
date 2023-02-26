import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'http';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { RecordFilter } from '../dto/filter/record-filter';
import { MaintenanceListRecordResponse } from '../dto/maintenance-list-record-response';
import { MaintenacnePartRequest, MaintenanceRecordRequest } from '../dto/maintenance-record-request';
import { MaintenanceRecordResponse } from '../dto/maintenance-record-response';
import { MaintenancePart } from '../entities/maintenacnepart.entity';
import { Maintenance } from '../entities/maintenance.entity';

@Injectable()
export class MaintenanceService {

    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>

    async saveMaintenance(user: User, request: MaintenanceRecordRequest, files: Express.Multer.File[]){
        const parts: MaintenancePart[] = this.toMaintenancePart(request.parts)
        const result = await this.maintenanceRepository.save({
            eventedAt: request.eventDate, location: request.location, memo: request.memo, 
            user: user, maintenancePart: parts
        })
        //TODO Image 삽입
        return result.id
    }

    toMaintenancePart(requests: MaintenacnePartRequest[]) {
        return requests.map(it => {
            const part = new MaintenancePart();
            part.charge = it.charge;
            part.title = it.name;
            return part;
        })
    }

    async findAllMaintenance(user: User, filter: RecordFilter) { //TODO - Filter Interceptor Transform 추가
        const start: Date = new Date(filter.date)
        const end: Date = new Date(filter.date)
        end.setMonth(1); //TODO JS-Date Library 검토
        const maintenances = await this.maintenanceRepository.find({
            where: {
                user: user,
                ...(filter.date && {eventedAt: Between(start, end)})
            },
            relations: {maintenancePart: true}
        })
        return maintenances.map(it => new MaintenanceListRecordResponse(it))
    }
 
    async findlMaintenanceByid(user: User, id: number) {
        const maintenance = await this.maintenanceRepository.findOne({
            where: {user: user, id: id},
            relations: {maintenancePart: true}
        })
        return new MaintenanceRecordResponse(maintenance);
    }

    async updateMaintenance(user: User, distance: number, id: number) {
        const maintenance = await this.maintenanceRepository.findOne({
            where: {user: user, id: id},
            relations: {maintenancePart: true}
        })
        return await this.maintenanceRepository.save(maintenance);
    }

    async deleteMaintenance(user: User, id: number) {
        const result = await this.maintenanceRepository.softDelete({id: id, user: user}) //TODO maintainpart도 같이 삭제되야함.
        return result.affected ? true: false;
    }

    //TODO 정비 항목 노출 관련한 테이블 필요.
    //정비 파츠 관련한 고를 수 있게 하는 항목 필요
    async findAllMaintenancePart(user: User) {
        const result = await this.maintenanceRepository.find({
            where: {user: user},
            relations: {
                maintenancePart: true
            }
        })
        const response = []
        result.map(it => {
            return {
                eventDate: it.eventedAt,
                maintenacePart: it.maintenancePart
            }
        }).forEach(e => {
            if (e.maintenacePart.length > 0) 
                e.maintenacePart.forEach(it => {
                    response.push({
                        id: it.id,
                        title: `${e.eventDate.getMonth()}월 ${e.eventDate.getDay()}: ${it.title}`, //
                    })
                })
        });//TODO reduce 함수 적용해보기. && 시간함수도 때오기
        return response;
    }

}
