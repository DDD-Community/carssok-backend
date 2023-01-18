import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from './car.service';
import { SimpleAuthGuard } from 'src/simple-auth/simple-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { encryptionUtills } from 'src/utils/encryption';
import { UpdateCarInfoDto } from './dto/updateCarInfo.dto';
import { ImageService } from 'src/image/image.service';
import { CreateCarInfoDto } from './dto/createCarInfo.dto';

@Controller('car')
@UseGuards(SimpleAuthGuard)
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly simpleAuthGuard: SimpleAuthGuard,
    private readonly imageService: ImageService,
  ) {}

  // @Post('craeteCarInfo')
  // async createCarInfo(
  //   @Body() createCarInfoDto: CreateCarInfoDto,
  // ): Promise<Car> {
  //   return await this.carService.createCarInfo(createCarInfoDto);
  // }

  // @Post('createCarInfo')
  // @UseGuards(SimpleAuthGuard)
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     ...fileInterCepter,
  //   }),
  // )
  // async createCarInfo(
  //   @UploadedFile() file: Express.MulterS3.File,
  //   @Body() createCarInfoDto: CreateCarInfoDto,
  //   @Req() request,
  // ) {
  //   const userId = parseInt(
  //     await encryptionUtills.decrypt(request.headers['user_token']),
  //   );

  //   const image = file['location'];
  //   const car = await this.carService.createCarInfo(
  //     createCarInfoDto,
  //     image,
  //     userId,
  //   );
  // }

  @Post('createCarInfo')
  @UseInterceptors(FilesInterceptor('files', 1))
  async test(
    @UploadedFiles() files: Express.Multer.File,
    @Req() request,
    @Body() createCarInfoDto: CreateCarInfoDto,
  ) {
    const userId = parseInt(
      await encryptionUtills.decrypt(request.headers['user_token']),
    );
    const carInfo = await this.carService.createCarInfo(
      createCarInfoDto,
      userId,
    );

    if (files) {
      const images = await this.imageService.uploadImage(files, request);
      const car = await this.carService.findCarInfo(carInfo['id']);
      return await this.imageService.saveImage(images, car);
    } else {
      return carInfo;
    }
  }

  @Put('updateCarInfo/:id')
  @UseInterceptors(FilesInterceptor('files', 1))
  async updateCarInfo(
    @Param('id') id: string,
    @Body() updateCarInfoDto: UpdateCarInfoDto,
    @UploadedFiles() files: Express.Multer.File,
    @Req() request,
  ) {
    if (files) {
      const images = await this.imageService.uploadImage(files, request);
      const updatedImg = await this.imageService.updateImage(images, id);
    }

    return await this.carService.uploadCarInfo(id, updateCarInfoDto);
  }

  @Post('deleteCarInfo')
  async deleteCarInfo() {}

  @Get('findCarInfo')
  async findCarInfo() {}
}
