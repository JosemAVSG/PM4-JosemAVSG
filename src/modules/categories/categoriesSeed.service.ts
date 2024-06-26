import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';

@Injectable()
export class CategorySeedService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {}

  async seed() {
    const categoriesData = [
      { name: 'smartphone' },
      { name: 'monitor' },
      { name: 'keyboard' },
      { name: 'mouse' },
    ];

    for (const categoryData of categoriesData) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: categoryData.name } });
      if (!existingCategory) {
        const category = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(category);
      }
    }


    console.log('Category seeding complete!');
  }
}
