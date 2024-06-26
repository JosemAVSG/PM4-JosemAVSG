import {Test} from '@nestjs/testing';
import {CategoriesService} from './categories.service';
import {CategoriesRepository} from './categories.repository';
import {Categories} from './categories.entity';
import {BadRequestException} from '@nestjs/common';


describe('CategoriesService', () => {
    let categoriesService: CategoriesService;
    let mockCategoriesService: Partial<CategoriesRepository>;
    const mockCategory = {
        name: 'Test Category',
    };
    const mockCategoryResolved: Categories = {
        id: '12341234-123412341-14wegw123-123',
        name: 'Test Category',
        products: undefined
    }
    beforeEach(async () => {
        mockCategoriesService = {
            addCategories: (name: string) => Promise.resolve(undefined),
            getCategories: () => Promise.resolve([]),
         }
        const module = await Test.createTestingModule({
            providers: [
                CategoriesService,
                {
                    provide: CategoriesRepository,
                    useValue: mockCategoriesService
                }
            ]
        }).compile();
        categoriesService = module.get<CategoriesService>(CategoriesService);
    });

    it('should be defined', () => {
        expect(categoriesService).toBeDefined();
    });
    it ('should throw an error if category is not found', async () => {
        try {
            await categoriesService.getCategories();
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })
    it('should throw an error if category is not created', async () => {
        try {
            await categoriesService.addCategories('test');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })
    it('should get all categories', async () => {
        mockCategoriesService.getCategories = () => Promise.resolve([mockCategoryResolved]);
        const categories = await categoriesService.getCategories();
        expect(categories).toEqual([mockCategoryResolved]);
    })

    it('should add a category', async () => {
        mockCategoriesService.addCategories = () => Promise.resolve(mockCategoryResolved);
        const category = await categoriesService.addCategories(mockCategory.name);
        expect(category).toEqual(mockCategoryResolved);
    })
})
