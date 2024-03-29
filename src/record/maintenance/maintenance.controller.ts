import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Headers,
  Req,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { UserService } from 'src/user/user.service';
import { RecordFilter } from '../dto/filter/record-filter';
import { MaintenanceRecordRequest } from '../dto/maintenance-record-request';
import { MaintenanceService } from './maintenance.service';
import { CarService } from 'src/car/car.service';
import { ImageService } from 'src/image/image.service';

@Controller('record')
@UseInterceptors(FilesInterceptor('files', 5))
@UseGuards(SimpleAuthGuard)
export class MaintenanceController {
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly maintenanceService: MaintenanceService;
  @Inject()
  private readonly carService: CarService;
  @Inject()
  private readonly imageService: ImageService;

  @Post('/maintenances')
  @HttpCode(201)
  async saveMaintenanceRecord(
    @Headers('user-token') token: string,
    @Body() request: MaintenanceRecordRequest,
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const recordType = 'maintenance';
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);

    const record = await this.maintenanceService.saveMaintenance(car, request);
    if (files) {
      const image = await this.imageService.uploadImage(files, req);
      await this.imageService.saveImage(
        image,
        record['id'],
        recordType,
        car['id'],
      );
    }
    return {
      id: record.id,
      status: '저장완료',
    };
  }

  @Get('/maintenances')
  async findMaintenanceRecords(
    @Headers('user-token') token: string,
    @Query() filter: RecordFilter,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    return await this.maintenanceService.findAllMaintenance(car, filter);
  }

  @Get('/maintenances/parts')
  async findAllMaintenancePart(@Headers('user-token') token: string) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    return await this.maintenanceService.findAllMaintenancePart(car);
  }

  @Get('/maintenances/:id')
  async findMaintenanceRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    return await this.maintenanceService.findlMaintenanceByid(car, id);
  }

  @Put('/maintenances/:id')
  async updateMaintenanceRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
    @Body() request: MaintenanceRecordRequest,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const { distance } = request;
    await this.maintenanceService.updateMaintenance(car, distance, id);
    return {
      status: '수정완료',
    };
  }

  @Delete('/maintenances/:id')
  async deleteMaintenanceRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    await this.maintenanceService.deleteMaintenance(car, id);
    return {
      status: '삭제완료',
    };
  }
}
