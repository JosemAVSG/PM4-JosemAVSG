import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
@Injectable()
export class CategoriesRepository extends Repository<Categories> {
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>) {
        super(categoriesRepository.target, categoriesRepository.manager, categoriesRepository.queryRunner);
    }
    async getCategories(): Promise<Categories[]> {
        return await this.categoriesRepository.find();
    }

    async addCategories( name : string ): Promise<Categories> {
        const category = this.categoriesRepository.create({ name });
        return await this.categoriesRepository.save(category);
    }
}