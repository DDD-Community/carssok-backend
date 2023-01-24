import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Model } from './entities/model.entity';
import { Detail } from './entities/detail.entity';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Model, Detail])],
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
