import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import dayjs from 'dayjs';
import { s3Client } from 'src/utils/aws';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadImage(files: Express.Multer.File, request) {
    const numOfFiles = request.files.length;
    const keyArr: string[] = [];
    for (let i = 0; i < numOfFiles; i++) {
      if (files[i].size > 10 * 1024 * 1024)
        throw new Error('파일의 크기가 너무 큽니다.');

      const ext = (originalname: string) => {
        let temp = originalname.split('.')[1].toLowerCase();
        if (temp === 'jpeg') temp = 'jpg';
        const support = ['png', 'jpg'];
        if (!support.includes(temp))
          throw new Error('지원하지 않는 확장자입니다.');
        else return temp;
      };
      const now = new Date();
      // 폴더명이랑 버킷명 변수로 받자
      const key = `${dayjs(now).format(
        'YYYYMMDD',
      )}/${now.getTime()}-${Math.floor(Math.random() * 100)}.${ext(
        files[i].originalname,
      )}`;
      const params: PutObjectCommandInput = {
        Bucket: 'carssok',
        Key: key,
        Body: files[i].buffer,
        ContentLength: files[i].size,
      };

      const result = await s3Client.putObject(params);
      keyArr.push(key);
    }

    return keyArr;
  }

  async saveImage(keyArr: string[], carInfo: Car) {
    const result = keyArr.map(async (v) => {
      const car = await this.imageRepository.save({
        image: `https://carssok.s3.ap-northeast-2.amazonaws.com/${v}`,
        car: carInfo,
      });
      return car;
    });
    return result;
  }

  async updateImage(keyArr: string[], id) {
    const result = keyArr.map(async (v) => {
      const car = await this.imageRepository.update(
        { car: id },
        { image: `https://carssok.s3.ap-northeast-2.amazonaws.com/${v}` },
      );
      return car;
    });
    return result;
  }
}
