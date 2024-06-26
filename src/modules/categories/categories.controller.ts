import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { CategorySeedService } from './categoriesSeed.service';
import { CategoriesService } from './categories.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

    constructor(private readonly categorySeedService: CategorySeedService, private readonly categoriesService: CategoriesService ) {}

    @Post('seeder')
    async seed() {
        const categoriesSeedService = this.categorySeedService;
        return await categoriesSeedService.seed();
    }
    @Get()
    async getCategories(@Res () res: Response) {
        const categories = await this.categoriesService.getCategories();
        res.status(200).json(categories);
    }

    @Post()
    async addCategories(@Res () res: Response,@Body() body:{name: string}) {
        const {name} = body;
        const red = this.categoriesService.addCategories(name);
        res.status(201).json(red);
    }
}
