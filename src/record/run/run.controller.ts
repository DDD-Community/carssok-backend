import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  Put,
  Param,
  Delete,
  Query,
  Headers,
} from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { RecordFilter } from '../dto/filter/record-filter';
import { RunRecordRequest } from '../dto/run-record-request';
import { RunService } from './run.service';
import { CarService } from 'src/car/car.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
export class RunController {
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly runService: RunService;
  @Inject()
  private readonly carService: CarService;

  @Post('/runs')
  async saveRunRecord(
    @Body() request: RunRecordRequest,
    @Headers('user-token') token: string,
  ) {
    const { eventedAt, ...rest } = request;
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const runRecord = await this.runService.saveRun(
      rest,
      car,
      new Date(eventedAt),
    );
    return {
      id: runRecord.id,
      status: '저장완료',
    };
  }

  @Get('/runs/total-distance')
  async findUserTotalDistance(@Headers('user-token') token: string) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const result = await this.runService.findAccumulateDistance(car);
    return result;
  }

  @Get('/runs')
  async findMyRuns(
    @Headers('user-token') token: string,
    @Query() filter: RecordFilter,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    return await this.runService.findAllRun(car, filter);
  }

  @Put('/runs/:id')
  async updateRunDistance(
    @Body('distance') distance: number,
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const result = await this.runService.updateRun(distance, id, car);
    return {
      status: '수정완료',
    };
  }

  @Delete('/runs/:id')
  async deleteRun(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const result = await this.runService.deleteRun(car, id);
    return {
      status: '삭제완료',
    };
  }
}
