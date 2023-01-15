import { Body, Controller, Get, Inject, Post, Headers, UseGuards, Put, Param, Delete, Query } from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { RecordFilter } from '../dto/record-filter';
import { RunRecordRequest } from '../dto/run-record-request';
import { RunService } from './run.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
export class RunController {

    @Inject()
    private readonly userService: UserService
    @Inject()
    private readonly runService: RunService

   
    @Post('/runs')
    async saveRunRecord(@Headers('user-token') token:string, @Body()response: RunRecordRequest){
        console.log(token)
        const user = await this.userService.findUserbyToken(token);
        return await this.runService.saveRun(response, user);
    }

    @Get('/runs/total-distance')
    async findUserTotalDistance(@Headers('user-token') token: string) {
      const user = await this.userService.findUserbyToken(token);
        const result = await this.runService.findAccumulateDistance(user)
        return result
    }

    @Get('/runs')
    async findMyRuns(@Headers('user-token') token: string, @Query() filter: RecordFilter) {
        const user = await this.userService.findUserbyToken(token);
        return await this.runService.findAllRun(user, filter);
    }

    @Put('/runs/:id')
    async updateRunDistance(@Headers('user-token') token: string, @Body('distance') distance: number, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      const result = await this.runService.updateRun(user, distance, id);
      return result.id;
    }

    @Delete('/runs/:id')
    async deleteRun(@Headers('user-token') token: string, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      const result = await this.runService.deleteRun(user, id);
      return result.generatedMaps;
    }
}
