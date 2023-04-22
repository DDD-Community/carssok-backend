import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
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
import { UpdateCarInfoDto } from './dto/updateCarInfo.dto';
import { ImageService } from 'src/image/image.service';
import { CreateCarInfoDto } from './dto/createCarInfo.dto';
import { UserService } from 'src/user/user.service';
import { RecordType } from 'src/utils/type';
import { CarListService } from './carlist.service';

@Controller('cars')
@UseGuards(SimpleAuthGuard)
export class CarController {
  @Inject()
  private readonly carService: CarService;
  @Inject()
  private readonly imageService: ImageService;
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly carListService: CarListService;

  @Get()
  async findCars(@Headers('user-token') token: string) {
    const user = await this.userService.findUserbyToken(token);
    const cars = await this.carService.findCarInfos(user);
    return cars.map((v) => {
      return {
        id: v.id,
        manufacturer: v.brand.brand ? v.brand.brand : null,
        model: v.model.title ? v.model.title : null,
        year: v.detail.year ? v.detail.year : null,
        fuel: v.detail.fuel ? v.detail.fuel : null,
        rate: v.detail.rate ? v.detail.rate : null,
      };
    });
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 1))
  async createCarInfo(
    @UploadedFiles() files: Express.Multer.File[],
    @Headers('user-token') token: string,
    @Req() request,
    @Body() createCarInfoDto: CreateCarInfoDto,
  ): Promise<{ id: number; status: string }> {
    const { detailId, brandId, modelId, nickName } = createCarInfoDto;

    const user = await this.userService.findUserbyToken(token);
    const brand = await this.carListService.findBrand(brandId);
    const model = await this.carListService.findModel(modelId);
    const detail = await this.carListService.findDetail(detailId);
    const recordType: RecordType = 'car';
    const carInfo = await this.carService.createCarInfo(
      brand,
      model,
      detail,
      user,
      nickName,
    );

    if (files) {
      const images = await this.imageService.uploadImage(files, request);

      const car = await this.carService.findCarInfoById(carInfo['id'], user);

      await this.imageService.saveImage(
        images,
        car['id'],
        recordType,
        car['id'],
      );
    }

    return {
      id: carInfo.id,
      status: '저장완료',
    };
  }

  @Get(':id')
  async findCar(@Headers('user-token') token: string, @Param('id') id: number) {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfoById(id, user);

    const carId = car.id;
    const manufacturer = car.brand.brand;
    const model = car.model.title;
    const year = car.detail.year;
    const fuel = car.detail.fuel;
    const rate = car.detail.rate;

    return {
      id: carId ? carId : null,
      manufacturer: manufacturer ? manufacturer : null,
      model: model ? model : null,
      year: year ? year : null,
      fuel: fuel ? fuel : null,
      rate: rate ? rate : null,
    };
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('files', 1))
  async updateCarInfo(
    @Headers('user-token') token: string,
    @Param('id') id: number,
    @Body() updateCarInfoDto: UpdateCarInfoDto,
    @Req() request,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<{ status: string }> {
    const user = await this.userService.findUserbyToken(token);
    const car = await this.carService.findCarInfoById(id, user);
    const { detailId, modelId, brandId } = updateCarInfoDto;

    const brand = await this.carListService.findBrand(brandId);
    const model = await this.carListService.findModel(modelId);
    const detail = await this.carListService.findDetail(detailId);
    if (files) {
      const images = await this.imageService.uploadImage(files, request);
      await this.imageService.updateImage(images, car['id']);
    }

    await this.carService.updateCarInfo(car, brand, model, detail);
    return {
      status: '수정완료',
    };
  }

  @Put(':id/nickname')
  async updateNickName(
    @Param('id') id: number,
    @Headers('user-token') token: string,
    @Body('nickName') nickName: string,
  ): Promise<{ status: string }> {
    const user = await this.userService.findUserbyToken(token);
    await this.carService.updateNickName(id, nickName, user);
    return {
      status: '닉네임 수정완료',
    };
  }

  @Delete(':id')
  async deleteCarInfo(
    @Param('id') id: number,
    @Headers('user-token') token: string,
  ): Promise<{ status: string }> {
    const user = await this.userService.findUserbyToken(token);
    await this.carService.deleteCarInfo(id, user);
    return {
      status: '삭제완료',
    };
  }
}
