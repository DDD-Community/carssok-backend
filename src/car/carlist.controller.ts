import { Controller, Get, Param } from '@nestjs/common';

import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';
import { CarListService } from './carlist.service';

@Controller()
export class CarListController {
  constructor(private readonly carListService: CarListService) {}

  @Get('/brands')
  async findBrands(): Promise<Brand[]> {
    return await this.carListService.findBrands();
  }

  @Get('/brands/:id')
  async findModels(@Param('id') brandId: string): Promise<Model[]> {
    const brand = await this.carListService.findBrand(brandId);
    const models = await this.carListService.findModels(brand);
    return models;
  }

  @Get('/models/:id')
  async findDetails(@Param('id') modelId: string): Promise<Detail[]> {
    const model = await this.carListService.findDetails(modelId);
    return model.detail;
  }

  @Get('/details/:id')
  async findDetail(@Param('id') detailId: string): Promise<Detail> {
    const detail = await this.carListService.findDetail(detailId);

    return detail;
  }
}
