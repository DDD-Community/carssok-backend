import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  Headers,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { FuelRecordRequest } from '../dto/fuel-record-request';
import { AccidentService } from './accident.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
export class AccidentController {
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly accidentService: AccidentService;

  @Post('/accidents')
  @HttpCode(201)
  async saveAccidentRecord(
    @Headers('user-token') token: string,
    @Body() request: FuelRecordRequest,
  ) {
    const user = await this.userService.findUserbyToken(token);
    return await this.accidentService.saveAccident(user, request);
  }

  @Get('/accidents')
  async findAccidentRecords(@Headers('user-token') token: string) {
    const user = await this.userService.findUserbyToken(token);
    return await this.accidentService.findAllAccident(user, {});
  }

  @Get('/accidents/:id')
  async findAccidentRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    return await this.accidentService.findAccidnetByid(user, id);
  }

  @Put('/accidents/:id')
  async updateAccidentRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
    @Body() request: FuelRecordRequest,
  ) {
    const user = await this.userService.findUserbyToken(token);
  }

  @Delete('/accidents/:id')
  async deleteAccidentRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    await this.accidentService.deleteAccidentById(user, id);
  }
}
