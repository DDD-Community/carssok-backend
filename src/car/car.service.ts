import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import { Brand } from 'src/car/entities/brand.entity';
import { Detail } from './entities/detail.entity';
import { Model } from './entities/model.entity';

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
    const car = Car.createCarInfo(brand, model, detail, nickName, user);
    return await this.carRepository.save(car);
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
