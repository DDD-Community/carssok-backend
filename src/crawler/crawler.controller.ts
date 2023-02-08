import { Controller, Get, Param } from '@nestjs/common';

import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('brand')
  async findBrands(): Promise<Brand[]> {
    return await this.crawlerService.findBrands();
  }

  @Get('/brand/:id')
  async findModels(@Param('id') brandId: string): Promise<Model[]> {
    const brand = await this.crawlerService.findBrand(brandId);
    const models = await this.crawlerService.findModels(brand);
    return models;
  }

  @Get('/model/:id')
  async findDetails(@Param('id') modelId: string): Promise<Detail[]> {
    const model = await this.crawlerService.findDetails(modelId);
    return model.detail;
  }

  @Get('/detail/:id')
  async findDetail(@Param('id') detailId: string): Promise<Detail> {
    const detail = await this.crawlerService.findDetail(detailId);

    return detail;
  }
}
