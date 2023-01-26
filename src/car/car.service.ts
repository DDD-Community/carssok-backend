import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Brand } from 'src/crawler/entities/brand.entity';
import { Model } from 'src/crawler/entities/model.entity';
import { Detail } from 'src/crawler/entities/detail.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async createCarInfo(
    brand: Brand,
    model: Model,
    detail: Detail,
    user: User,
    nickName,
  ): Promise<Car> {
    const car = await this.carRepository.save({
      brand,
      model,
      detail,
      user,
      nickName,
    });
    return car;
  }

  async updateCarInfo(carId, brand: Brand, model: Model, detail: Detail) {
    const car = await this.carRepository.findOne({
      where: { id: +carId },
      relations: ['model', 'detail', 'brand'],
    });
    const updatedCar = { ...car, ...{ brand, model, detail } };

    await this.carRepository.save(updatedCar);
    return updatedCar;
  }

  async updateNickName(carId, nickName) {
    const originalNickName = await this.carRepository.findOne({
      where: { id: +carId },
    });
    const updatedNickName = { ...originalNickName, nickName };

    await this.carRepository.save(updatedNickName);
    return updatedNickName;
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
    const deletedCar = await this.carRepository.softDelete(carId);
    return deletedCar.affected ? true : false;
  }
}
