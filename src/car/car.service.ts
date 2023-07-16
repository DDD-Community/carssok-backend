import { Body, Inject, Injectable } from '@nestjs/common';
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
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async createMyCar(@Body('detailId') detailId: number, user: User) {
    try {
      const result = await this.detailRepository
        .createQueryBuilder('detail')
        .leftJoinAndSelect('detail.model', 'model')
        .leftJoinAndSelect('model.brand', 'brand')
        .where('detail.id = :id', { id: detailId })
        .getOne();

      const brand = await this.brandRepository.findOne({
        where: { id: result.model.brand.id },
      });
      const model = await this.modelRepository.findOne({
        where: { id: result.model.id },
      });
      const detail = await this.detailRepository.findOne({
        where: { id: result.id },
      });

      const car = await Car.createCarInfo(brand, model, detail, user);
      const myCar = await this.carRepository.save(car);
      if (!myCar) throw new Error('occured error during registering my car');
      return myCar;
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
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
