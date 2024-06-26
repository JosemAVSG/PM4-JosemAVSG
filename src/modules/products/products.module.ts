import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { ProductSeedService } from './productsSeed.service';
import { Categories } from '../categories/categories.entity';
import { CategorySeedService } from '../categories/categoriesSeed.service';
import {CategoriesRepository} from "../categories/categories.repository"
@Module({
  imports: [TypeOrmModule.forFeature([Products,Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductSeedService,CategorySeedService,CategoriesRepository],

})
export class ProductsModule {}
