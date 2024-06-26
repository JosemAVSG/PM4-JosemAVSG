import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { CloudinaryService } from './cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { Files } from './file.entity';
import { Products } from '../products/products.entity';
import { ProductsRepository } from '../products/products.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { Categories } from '../categories/categories.entity';
import { cloudinaryConfig } from '../../config/cloudinaryconfig';

@Module({
  imports: [TypeOrmModule.forFeature([Files, Products,Categories])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService, cloudinaryConfig, FileRepository,ProductsRepository,CategoriesRepository],
})

export class FilesModule {}