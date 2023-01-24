import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarInfoDto } from './dto/createCarInfo.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async createCarInfo(detail, user, plateNumber, nickName): Promise<Car> {
    const car = await this.carRepository.save({
      detail,
      user,
      nickName,
      plateNumber,
    });
    return car;
  }

  async uploadCarInfo(carId, updateCarInfoDto) {
    const updatedCarInfo = await this.carRepository.update(
      carId,
      updateCarInfoDto,
    );
    return updatedCarInfo;
  }

  async findCarInfo(carId) {
    const car = await this.carRepository.findOne({
      where: { id: +carId },
    });
    return car;
  }

  async findCarInfos(user) {
    const cars = await this.carRepository.find({
      where: { user },
    });
    return cars;
  }

  async deleteCarInfo(carId) {
    const deletedCar = await this.carRepository.delete(carId);
    return deletedCar.affected ? true : false;
  }
}
