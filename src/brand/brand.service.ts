import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,

    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,

    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,
  ) {}

  async findBrands() {
    const brands = await this.brandRepository.find();
    return brands;
  }

  async findModelInBrand(brandId) {
    const brand = await this.brandRepository
      .createQueryBuilder('brand')
      .leftJoinAndSelect('brand.model', 'model')
      .leftJoinAndSelect('model.detail', 'detail')
      .where('brand.id = :id', { id: +brandId })
      .getOne();

    return brand.model;
  }
}
