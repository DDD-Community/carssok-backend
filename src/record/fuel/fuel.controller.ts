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
} from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { FuelRecordRequest } from '../dto/fuel-record-request';
import { RecordFilter } from '../dto/filter/record-filter';
import { FuelService } from './fuel.service';
import { CarService } from 'src/car/car.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
export class FuelController {
  @Inject()
  private readonly fuelService: FuelService;
  @Inject()
  private readonly carService: CarService;

  @Post('/fuels')
  async saveFuelRecord(@Body() request: FuelRecordRequest) {
    const { carId, eventedAt, ...rest } = request;

    const car = await this.carService.findCarInfo(carId);
    return await this.fuelService.saveFuel(car, new Date(eventedAt), rest);
  }

  @Get('/fuels')
  async findFuelRecords(
    @Param('carId') carId: number,
    @Query() filter: RecordFilter,
  ) {
    const car = await this.carService.findCarInfo(carId);
    return await this.fuelService.findAllFuel(car, filter);
  }

  @Get('/fuels/:id')
  async fndFuelRecord(@Param('id') id: number) {
    return await this.fuelService.findFuelById(id);
  }

  @Put('/fuels/:id')
  async updateFuelRecord(
    @Param('id') id: number,
    @Body() request: FuelRecordRequest,
  ) {
    const { carId, ...rest } = request;
    const car = await this.carService.findCarInfo(carId);
    return await this.fuelService.updateFuelById(car, id, rest);
  }

  @Delete('/fuels/:id')
  async deleteFuelRecord(@Param('id') id: number) {
    return await this.fuelService.deleteFuelById(id);
  }
}
