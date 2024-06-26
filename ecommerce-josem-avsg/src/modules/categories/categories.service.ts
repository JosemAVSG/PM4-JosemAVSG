import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Categories } from './categories.entity';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class CategoriesService {

    constructor(private  categorysRepository: CategoriesRepository) {}
    
    async getCategories(): Promise<Categories[]> {
        const categories = await this.categorysRepository.getCategories();
        if(!categories) throw new BadRequestException('Categories not found');
        return categories;
    
    }

    async addCategories( name : string ): Promise<Categories> { 
        const category = this.categorysRepository.addCategories(name);
        if(!category) throw new BadRequestException('Categories not Created');
        return  category;
    }
}
