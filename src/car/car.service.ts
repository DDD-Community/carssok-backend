import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarInfoDto } from './dto/createCarInfo.dto';
import { User } from 'src/user/entities/user.entity';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3Client } from 'src/utils/aws';
import dayjs from 'dayjs';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCarInfo(
    createCarInfoDto: CreateCarInfoDto,
    userId,
  ): Promise<Car> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    console.log(user);
    const car = await this.carRepository.save({
      ...createCarInfoDto,
      user,
    });
    return car;
  }

  async uploadCarInfo(id, updateCarInfoDto) {
    const updatedCarInfo = await this.carRepository.update(
      +id,
      updateCarInfoDto,
    );
    return updatedCarInfo;
  }

  async findCarInfo(carId) {
    const car = await this.carRepository.findOne({
      where: { id: carId },
    });
    return car;
  }
}
