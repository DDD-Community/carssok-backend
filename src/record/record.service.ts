import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { RunRecordRequest } from './dto/run-record-request';
import { Accident } from './entities/accident.entity';
import { Fuel } from './entities/fuel.entity';
import { Maintenance } from './entities/maintenance.entity';
import { Run } from './entities/run.entity';

@Injectable()
export class RecordService {
    
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>
    @InjectRepository(Fuel)
    private readonly fuelRepository: Repository<Fuel>
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>
    @InjectRepository(Run)
    private readonly runRepository: Repository<Run>

    async saveRun(request: RunRecordRequest, user: User){
        return await this.runRepository.insert({eventedAt: request.eventDate, distance: request.distance, user: user})
    }

    async findAccumulateDistance(id: number): Promise<number>{
        return await this.runRepository.createQueryBuilder('run')
            .select('IFNULL(SUM(run.distance), 0)', 'distance')
            .where('run.user_id = :id', {id: id})
            .getRawOne();
    }

    async findAllRun(user: User, filter: any){
        return await this.runRepository.find({
            where: {
                user: user,
                ...(filter.date && {eventedAt: Between(filter.date, filter.date.setMonth(filter.date.getMonth()+1))})
            }
        })
    }
    

}
