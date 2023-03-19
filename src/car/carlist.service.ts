import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';

@Injectable()
export class CarListService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,

    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
  ) {}

  async findBrands() {
    return await this.brandRepository.find();
  }

  async findBrand(brandId) {
    return await this.brandRepository.findOne({
      where: { id: +brandId },
    });
  }

  async findModels(brand: Brand) {
    return await this.modelRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.brand', 'brand')
      .where('brand = brand', { brand })
      .getMany();
  }

  async findModel(modelId): Promise<Model> {
    const model = await this.modelRepository.findOne({
      where: { id: +modelId },
    });
    return model;
  }

  async findDetails(modelId) {
    return await this.modelRepository.findOne({
      where: { id: modelId },
      relations: ['detail'],
    });
  }

  async findDetail(detailId): Promise<Detail> {
    const detail = await this.detailRepository.findOne({
      where: { id: +detailId },
    });
    return detail;
  }
}
