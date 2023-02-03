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
  async saveRunRecord(@Body() request: RunRecordRequest) {
    const { carId, eventedAt, ...rest } = request;
    const car = await this.carService.findCarInfo(carId);
    return await this.runService.saveRun(rest, car, new Date(eventedAt));
  }

  @Get('/runs/total-distance')
  async findUserTotalDistance(@Body('carId') carId: number) {
    const car = await this.carService.findCarInfo(carId);
    const result = await this.runService.findAccumulateDistance(car);
    return result;
  }

  @Get('/runs')
  async findMyRuns(
    @Body('carId') carId: number,
    @Query() filter: RecordFilter,
  ) {
    const car = await this.carService.findCarInfo(carId);
    return await this.runService.findAllRun(car, filter);
  }

  @Put('/runs/:id')
  async updateRunDistance(
    @Body('distance') distance: number,
    @Param('id') id: number,
  ) {
    const result = await this.runService.updateRun(distance, id);
    return result.id;
  }

  @Delete('/runs/:id')
  async deleteRun(@Body('carId') carId: number, @Param('id') id: number) {
    const car = await this.carService.findCarInfo(carId);
    const result = await this.runService.deleteRun(car, id);
    return result;
  }
}
