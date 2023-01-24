import {
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadImage(
    @UploadedFiles() files: Express.Multer.File,
    @Req() request,
  ) {
    const images = await this.imageService.uploadImage(files, request);
    console.log(images);
  }
}
