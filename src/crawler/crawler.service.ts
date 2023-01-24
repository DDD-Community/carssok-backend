import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';

@Injectable()
export class CrawlerService {
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
      where: { id: brandId },
    });
  }

  async findModels(brand: Brand) {
    return await this.modelRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.brand', 'brand')
      .where('brand = brand', { brand })
      .getMany();
  }

  async findDetails(modelId) {
    return await this.modelRepository.findOne({
      where: { id: modelId },
      relations: ['detail'],
    });
  }

  async findDetail(detailId) {
    return await this.detailRepository
      .createQueryBuilder('detail')
      .leftJoinAndSelect('detail.model', 'model')
      .leftJoinAndSelect('model.brand', 'brand')
      .where('detail.id = :id', { id: detailId })
      .getOne();
  }
}
