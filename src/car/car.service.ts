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
    nickName: string,
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

  async updateCarInfo(car: Car, brand: Brand, model: Model, detail: Detail) {
    const updatedCar = { ...car, ...{ brand, model, detail } };

    await this.carRepository.save(updatedCar);
    return updatedCar;
  }

  async updateNickName(id: number, nickName: string, user: User) {
    const originalNickName = await this.carRepository.findOne({
      where: { id, user },
    });
    const updatedNickName = { ...originalNickName, nickName };

    await this.carRepository.save(updatedNickName);
    return updatedNickName;
  }

  async findCarInfo(user: User) {
    const car = await this.carRepository.findOne({
      where: { user },
      select: ['brand', 'detail', 'model', 'nickName', 'id'],
      relations: ['brand', 'model', 'detail'],
    });
    return car;
  }

  async findCarInfos(user: User) {
    const cars = await this.carRepository.find({
      where: { user },
      select: ['brand', 'detail', 'model', 'nickName', 'id'],
      relations: ['brand', 'model', 'detail'],
    });
    return cars;
  }

  async findCarInfoById(id: number, user: User) {
    const car = await this.carRepository.findOne({
      where: { user, id },
      select: ['brand', 'detail', 'model', 'nickName', 'id'],
      relations: ['brand', 'model', 'detail'],
    });
    return car;
  }

  async deleteCarInfo(id: number, user: User) {
    const car = await this.carRepository.findOne({
      where: { id, user },
    });
    const deletedCar = await this.carRepository.softDelete(car);
    return deletedCar.affected ? true : false;
  }
}
