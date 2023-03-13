import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Delete,
  Get,
  Put,
  UseGuards,
  Query,
  Headers,
  Head,
} from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { FuelRecordRequest } from '../dto/fuel-record-request';
import { RecordFilter } from '../dto/filter/record-filter';
import { FuelService } from './fuel.service';
import { CarService } from 'src/car/car.service';
import { UserService } from 'src/user/user.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
export class FuelController {
  @Inject()
  private readonly fuelService: FuelService;
  @Inject()
  private readonly carService: CarService;
  @Inject()
  private readonly userService: UserService;

  @Post('/fuels')
  async saveFuelRecord(
    @Body() request: FuelRecordRequest,
    @Headers('user-token') token: string,
  ) {
    const { eventedAt, ...rest } = request;
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const fuelRecord = await this.fuelService.saveFuel(
      car,
      new Date(eventedAt),
      rest,
    );
    return {
      id: fuelRecord.id,
      status: '저장완료',
    };
  }

  @Get('/fuels')
  async findFuelRecords(
    @Headers('user-token') token: string,
    @Query() filter: RecordFilter,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    return await this.fuelService.findAllFuel(car, filter);
  }

  @Get('/fuels/:id')
  async fndFuelRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    return await this.fuelService.findFuelById(id, car);
  }

  @Put('/fuels/:id')
  async updateFuelRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
    @Body() request: FuelRecordRequest,
  ) {
    const { eventedAt, ...rest } = request;
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    await this.fuelService.updateFuelById(car, id, rest, new Date(eventedAt));
    return {
      status: '수정완료',
    };
  }

  @Delete('/fuels/:id')
  async deleteFuelRecord(
    @Param('id') id: number,
    @Headers('user-token') token: string,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    await this.fuelService.deleteFuelById(id, car);
    return {
      status: '삭제완료',
    };
  }
}
