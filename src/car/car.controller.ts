import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from './car.service';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  ): Promise<Car> {
    const { detailId, brandId, modelId, nickName } = createCarInfoDto;
    const userToken = request.headers['user-token'];
    const user = await this.userService.findUserbyToken(userToken);
    const brand = await this.crawlerService.findBrand(brandId);
    const model = await this.crawlerService.findModel(modelId);
    const detail = await this.crawlerService.findDetail(detailId);

    const carInfo = await this.carService.createCarInfo(
      brand,
      model,
      detail,
      user,
      nickName,
    );

    if (files) {
      const images = await this.imageService.uploadImage(files, request);
      const car = await this.carService.findCarInfo(carInfo['id']);
      await this.imageService.saveImage(images, car);
    }

    return carInfo;
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 1))
  async updateCarInfo(
    @Param('id') carId: string,
    @Body() updateCarInfoDto: UpdateCarInfoDto,
    @Req() request,
    @UploadedFiles() files?: Express.Multer.File,
  ) {
    const car = await this.carService.findCarInfo(carId);
    const { detailId, modelId, brandId } = updateCarInfoDto;

    const brand = await this.crawlerService.findBrand(brandId);
    const model = await this.crawlerService.findModel(modelId);
    const detail = await this.crawlerService.findDetail(detailId);
    if (files) {
      const images = await this.imageService.uploadImage(files, request);
      await this.imageService.updateImage(images, car);
    }

    return await this.carService.updateCarInfo(carId, brand, model, detail);
  }

  @Patch('nickName/:id')
  async updateNickName(
    @Param('id') carId: string,
    @Body('nickName') nickName: string,
  ) {
    console.log(nickName);
    return await this.carService.updateNickName(carId, nickName);
  }

  @Delete(':id')
  async deleteCarInfo(@Param('id') carId: string): Promise<boolean> {
    return await this.carService.deleteCarInfo(carId);
  }

  @Get()
  async findCars(@Req() request): Promise<Car[]> {
    const userToken = request.headers['user-token'];
    const user = await this.userService.findUserbyToken(userToken);
    return await this.carService.findCarInfos(user);
  }

  @Get(':id')
  async findCar(@Param('id') carId: string): Promise<Car> {
    return await this.carService.findCarInfo(carId);
  }
}
