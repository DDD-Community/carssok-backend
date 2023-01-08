import { Body, Controller, Get, Headers, Inject, Post, UseGuards } from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { encryptionUtills } from 'src/utils/encryption';
import { RunRecordRequest } from './dto/run-record-request';
import { RunRecordResponse } from './dto/run-record-response';
import { RecordService } from './record.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
export class RecordController {

    @Inject()
    private readonly recordService: RecordService
    @Inject()
    private readonly userService: UserService

    @Post('/runs')
    async saveRunRecord(@Headers('user_token') token:string, @Body()response: RunRecordRequest){
        const userId = parseInt(
            await encryptionUtills.decrypt(token),
          );
        const user = await this.userService.findUserId(userId);
        return await this.recordService.saveRun(response, user);
    }

    @Get('/runs/total-distance')
    async findUserTotalDistance(@Headers('user_token') token: string) {
        const userId = parseInt(
            await encryptionUtills.decrypt(token),
          );
        const result = await this.recordService.findAccumulateDistance(userId)
        return result
    }

    @Get('/runs')
    async findMyRuns(@Headers('user_token') token: string) {
        const userId = parseInt(
            await encryptionUtills.decrypt(token),
          );
        const user = await this.userService.findUserId(userId);
        const runs = await this.recordService.findAllRun(user, {});
        let result = [] 
        for (const run of runs) {
           result.push(new RunRecordResponse(run));
        }
        return result;
    }
    
}
