import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { RecordFilter } from '../dto/filter/record-filter';
import { MaintenanceListRecordResponse } from '../dto/maintenance-list-record-response';
import { MaintenanceRecordRequest } from '../dto/maintenance-record-request';
import { MaintenanceRecordResponse } from '../dto/maintenance-record-response';
import { MaintenancePart } from '../entities/maintenacnepart.entity';
import { Maintenance } from '../entities/maintenance.entity';

@Injectable()
export class MaintenanceService {

    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>

    async saveMaintenance(user: User, request: MaintenanceRecordRequest, files: Express.Multer.File[]){
        const parts: MaintenancePart[] = request.parts.map(it => {
            const part = new MaintenancePart();
            part.charge = it.charge;
            part.title = it.name;
            return part;
        })
        console.log(parts)
        // const result = await this.maintenanceRepository.insert({
        //     eventedAt: request.eventDate, location: request.location, memo: request.memo, 
        //     user: user, // maintenancePart: parts
        // })
        // return result.identifiers[0].id
    }

    async findAllMaintenance(user: User, filter: RecordFilter) { //TODO - Filter Interceptor Transform 추가
        const start: Date = new Date(filter.date)
        const end: Date = new Date(filter.date)
        end.setMonth(1); //TODO JS-Date Library 검토
        const maintenances = await this.maintenanceRepository.find({
            where: {
                user: user,
                ...(filter.date && {eventedAt: Between(start, end)})
            }
        })
        return maintenances.map(it => new MaintenanceListRecordResponse(it))
    }
 
    async findlMaintenanceByid(user: User, id: number) {
        const maintenance = await this.maintenanceRepository.findOneBy({user: user, id: id})
        return new MaintenanceRecordResponse(maintenance);
    }

    async updateMaintenance(user: User, distance: number, id: number) {
        const maintenance = await this.maintenanceRepository.findOneBy({user: user, id: id})
        return await this.maintenanceRepository.save(maintenance);
    }

    async deleteMaintenance(user: User, id: number) {
        const result = await this.maintenanceRepository.softDelete({id: id, user: user})
        return result.generatedMaps
    }
}
