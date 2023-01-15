import { Body, Controller, Inject, Param, Headers, Post, Delete, Get, Put, UseGuards, Query } from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { FuelRecordRequest } from '../dto/fuel-record-request';
import { RecordFilter } from '../dto/record-filter';
import { FuelService } from './fuel.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
export class FuelController {

    @Inject()
    private readonly userService: UserService
    @Inject()
    private readonly fuelService: FuelService


    @Post('/fuels')
    async saveFuelRecord(@Headers('user-token') token: string, @Body() request: FuelRecordRequest) {
      const user = await this.userService.findUserbyToken(token);
      return await this.fuelService.saveFuel(user, request);
    }

    @Get('/fuels')
    async findFuelRecords(@Headers('user-token') token: string, @Query() filter: RecordFilter) {
      const user = await this.userService.findUserbyToken(token);
      return await this.fuelService.findAllFuel(user, filter);
    }
    

    @Get('/fuels/:id')
    async fndFuelRecord(@Headers('user-token') token: string, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      return await this.fuelService.findFuelById(user, id);
    }

    @Put("/fuels/:id")
    async updateFuelRecord(@Headers('user-token') token: string, @Param('id') id: number, @Body() request: FuelRecordRequest) {
      const user = await this.userService.findUserbyToken(token);
      
    }

    @Delete("/fuels/:id")
    async deleteFuelRecord(@Headers('user-token') token: string, @Param('id') id: number) {
      const user = await this.userService.findUserbyToken(token);
      return await this.fuelService.deleteFuelById(user, id);
    }
}
