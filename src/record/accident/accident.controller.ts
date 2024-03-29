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
  Headers,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { AccidentRecordRequest } from '../dto/accident-record-request';
import { RecordFilter } from '../dto/filter/record-filter';
import { AccidentService } from './accident.service';
import { ImageService } from 'src/image/image.service';
import { RecordType } from 'src/utils/type';
import { CarService } from 'src/car/car.service';
import { UserService } from 'src/user/user.service';
import { Image } from 'src/image/entities/image.entity';

@Controller('record')
@UseGuards(SimpleAuthGuard)
@UseInterceptors(FilesInterceptor('files', 5))
export class AccidentController {
  @Inject()
  private readonly accidentService: AccidentService;
  @Inject()
  private readonly imageService: ImageService;
  @Inject()
  private readonly carService: CarService;
  @Inject()
  private readonly userService: UserService;

  @Post('/accidents')
  @HttpCode(201)
  async saveAccidentRecord(
    @Req() req,
    @Headers('user-token') token: string,
    @Body() request: AccidentRecordRequest,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const { eventedAt, ...rest } = request;
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
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
      return {
        id: accident.id,
        status: '저장완료',
      };
    }
    return {
      id: accident.id,
      status: '저장완료',
    };
  }

  @Get('/accidents')
  async findAccidentRecords(
    @Headers('user-token') token: string,
    @Query() filter: RecordFilter,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const accidentRecord = await this.accidentService.findAllAccident(
      car,
      filter,
    );
    return accidentRecord;
  }

  @Get('/accidents/:id')
  async findAccidentRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    const accidentRecord = await this.accidentService.findAccidnetByid(id, car);
    const url = await this.imageService.getImages('accident', id);

    return { ...accidentRecord, url };
  }

  @Put('/accidents/:id')
  async updateAccidentRecord(
    @Param('id') id: number,
    @Headers('user-token') token: string,
    @Body() request: AccidentRecordRequest,
    @Req() req,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const { eventedAt, ...rest } = request;
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    if (files) {
      const imageUpload = await this.imageService.uploadImage(files, req);
      await this.imageService.updateImage(imageUpload, car['id']);
    }
    await this.accidentService.updateAccidentById(
      id,
      rest,
      new Date(eventedAt),
      car,
    );

    return {
      status: '수정완료',
    };
  }

  @Delete('/accidents/:id')
  async deleteAccidentRecord(
    @Headers('user-token') token: string,
    @Param('id') id: number,
  ) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfo(user);
    await this.accidentService.deleteAccidentById(id, car);
    return {
      status: '삭제완료',
    };
  }
}
