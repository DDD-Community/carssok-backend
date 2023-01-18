import { Controller, Get, Param } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('brands')
  async findBrands(): Promise<Brand[]> {
    return await this.brandService.findBrands();
  }

  @Get('/:id')
  async findModelInBrand(@Param('id') brandId: string): Promise<Model[]> {
    return await this.brandService.findModelInBrand(brandId);
  }
}
