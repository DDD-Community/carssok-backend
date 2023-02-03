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
  HttpCode,
  Query,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { AccidentRecordRequest } from '../dto/accident-record-request';
import { RecordFilter } from '../dto/filter/record-filter';
import { AccidentService } from './accident.service';
import { ImageService } from 'src/image/image.service';
import { RecordType } from 'src/utils/type';
import { CarService } from 'src/car/car.service';

@Controller('record')
@UseGuards(SimpleAuthGuard)
@UseInterceptors(FilesInterceptor('files', 1))
export class AccidentController {
  @Inject()
  private readonly accidentService: AccidentService;
  @Inject()
  private readonly imageService: ImageService;
  @Inject()
  private readonly carService: CarService;

  @Post('/accidents')
  @HttpCode(201)
  async saveAccidentRecord(
    @Req() req,
    @Body() request: AccidentRecordRequest,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const { carId, eventedAt, ...rest } = request;
    const car = await this.carService.findCarInfo(carId);
    const accident = await this.accidentService.saveAccident(
      car,
      new Date(eventedAt),
      rest,
    );

    const recordType: RecordType = 'accident';
    if (files) {
      const imageUpload = await this.imageService.uploadImage(files, req);
      await this.imageService.saveImage(
        imageUpload,
        accident['id'],
        recordType,
        car['id'],
      );
      return accident;
    }
    return accident;
  }

  @Get('/accidents')
  async findAccidentRecords(
    @Body('carId') carId: number,
    @Query() filter: RecordFilter,
  ) {
    const car = await this.carService.findCarInfo(carId);
    return await this.accidentService.findAllAccident(car, filter);
  }

  @Get('/accidents/:id')
  async findAccidentRecord(
    @Body('carId') carId: number,
    @Param('id') id: number,
  ) {
    const car = await this.carService.findCarInfo(carId);
    return await this.accidentService.findAccidnetByid(id);
  }

  @Put('/accidents/:id')
  async updateAccidentRecord(
    @Param('id') id: number,
    @Body() request: AccidentRecordRequest,
    @Req() req,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const { carId, ...rest } = request;
    // const car = await this.carService.findCarInfo(carId);

    if (files) {
      const imageUpload = await this.imageService.uploadImage(files, req);
      await this.imageService.updateImage(imageUpload, id);
    }
    return await this.accidentService.updateAccidentById(id, rest);
  }

  @Delete('/accidents/:id')
  async deleteAccidentRecord(
    @Body('carId') carId: number,
    @Param('id') id: number,
  ) {
    // const car = await this.carService.findCarInfo(carId);
    return await this.accidentService.deleteAccidentById(id);
  }
}
