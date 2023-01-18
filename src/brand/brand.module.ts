import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Model, Detail])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
