import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository, Between } from 'typeorm';
import { RunRecordRequest } from '../dto/run-record-request';
import { RunRecordResponse } from '../dto/run-record-response';
import { Run } from '../entities/run.entity';

@Injectable()
export class RunService {

    @InjectRepository(Run)
    private readonly runRepository: Repository<Run>

    async saveRun(request: RunRecordRequest, user: User){
        const result = await this.runRepository.insert({eventedAt: request.eventDate, distance: request.distance, user: user})
        return result.identifiers[0].id
    }

    async findAccumulateDistance(user: User): Promise<number>{
        const result = await this.runRepository.createQueryBuilder('run')
                                .select('IFNULL(SUM(run.distance), 0)', 'distance')
                                .where('run.user_id = :id', {id: user.user_id})
                                .getRawOne();
        result.distance = parseInt(result.distance)
        return result
    }

    async findAllRun(user: User, filter: any){
        const start: Date = filter.date
        const end: Date = filter.date
        end.setMonth(1); //TODO JS-Date Library 검토
        const runs = await this.runRepository.find({
            where: {
                user: user,
                ...(filter.date && {eventedAt: Between(start, end)})
            }
        })
        return runs.map(it => new RunRecordResponse(it))
    }

    async updateRun(user: User, distance: number, id: number) {
        const run = await this.runRepository.findOneBy({user: user, id: id})
        run.distance = distance
        return await this.runRepository.save(run);
    }

    async deleteRun(user: User, id: number) {
        const result = await this.runRepository.softDelete({id: id, user: user})
        return result.generatedMaps
}
