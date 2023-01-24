import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from './car.service';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { encryptionUtills } from 'src/utils/encryption';
import { UpdateCarInfoDto } from './dto/updateCarInfo.dto';
import { ImageService } from 'src/image/image.service';
import { CreateCarInfoDto } from './dto/createCarInfo.dto';
import { Car } from './entities/car.entity';
import { UserService } from 'src/user/user.service';
import { CrawlerService } from 'src/crawler/crawler.service';

@Controller('car')
@UseGuards(SimpleAuthGuard)
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly imageService: ImageService,
    private readonly userService: UserService,
    private readonly crawlerService: CrawlerService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 1))
  async createCarInfo(
    @UploadedFiles() files: Express.Multer.File,
    @Req() request,
    @Body() createCarInfoDto: CreateCarInfoDto,
  ) {
    const userId = parseInt(
      await encryptionUtills.decrypt(request.headers['user-token']),
    );

    const { detailId, plateNumber, nickName } = createCarInfoDto;

    const user = await this.userService.findUserId(userId);
    const detail = await this.crawlerService.findDetail(detailId);

    const carInfo = await this.carService.createCarInfo(
      detail,
      user,
      plateNumber,
      nickName,
    );

    if (files) {
      const images = await this.imageService.uploadImage(files, request);
      const car = await this.carService.findCarInfo(carInfo['id']);
      return await this.imageService.saveImage(images, car);
    } else {
      return carInfo;
    }
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('files', 1))
  async updateCarInfo(
    @Param('id') carId: string,
    @Body() updateCarInfoDto: UpdateCarInfoDto,
    @Req() request,
    @UploadedFiles() files?: Express.Multer.File,
  ) {
    const car = await this.carService.findCarInfo(carId);
    const { detailId, ...rest } = updateCarInfoDto;
    let detail;
    if (detailId) {
      detail = await this.crawlerService.findDetail(detailId);
      const updateCarInfoDto = { ...rest, detail };

      return await this.carService.uploadCarInfo(carId, updateCarInfoDto);
    }
    if (files) {
      const images = await this.imageService.uploadImage(files, request);
      await this.imageService.updateImage(images, car);
    }

    return await this.carService.uploadCarInfo(carId, updateCarInfoDto);
  }

  @Delete(':id')
  async deleteCarInfo(@Param('id') carId: string) {
    return await this.carService.deleteCarInfo(carId);
  }

  @Get()
  async findCars(@Req() request) {
    const userId = parseInt(
      await encryptionUtills.decrypt(request.headers['user-token']),
    );
    const user = await this.userService.findUserId(userId);
    return await this.carService.findCarInfos(user);
  }

  @Get(':id')
  async findCar(@Param('id') carId: string): Promise<Car> {
    return await this.carService.findCarInfo(carId);
  }
}
