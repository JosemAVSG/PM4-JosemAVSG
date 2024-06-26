import { Test } from "@nestjs/testing";
import { ProductsService } from "./products.service";
import { BadRequestException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./products.entity";
import { CreateProductDto } from "src/interfaces/dtos/createProduct.dto";

describe('ProductsService', () => {
    let productsService: ProductsService;
    let mockProductRepository: Partial<ProductsRepository>

    const mockProduct: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
        stock: 5,
        categoriaId: '1'
    };

    const mockProductResolved: Products = {
        id: '12341234-123412341-14wegw123-123',
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
        stock: 5,
        imgUrl: '',
        categories: '1' as any,
        orderDetails: undefined
    };

    beforeEach(async () => {
         
        mockProductRepository = {
            getProducts: (page: number, limit: number) => Promise.resolve(undefined),
            getProductbyCategoryId: (id: string) => Promise.resolve(undefined),
            getProductbyId: (id: string) => Promise.resolve(undefined),
            createProduct: (product: CreateProductDto) => Promise.resolve(undefined),
            updateProduct: (id: string, product: Partial<Products>) => Promise.resolve(undefined),
            deleteProduct: (id: string) => Promise.resolve(undefined)
        };

        const module = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ProductsRepository,
                    useValue: mockProductRepository
                }
            ]
        }).compile();

        productsService = module.get<ProductsService>(ProductsService);

    });

    it('should be defined', () => {
        const service: ProductsService = productsService
        expect(service).toBeDefined();
    });

    it('should throw an error if product is not found', async () => {
        
        try {
            await productsService.getProduct('123');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })

    it('should get products', async () => {
        mockProductRepository.getProducts = (page: number, limit: number) => Promise.resolve([ mockProductResolved ]);

        const products = await productsService.getProducts(1, 5);

        expect(products).toEqual([ mockProductResolved ]);
    })

    it('should get products by category', async () => {
        mockProductRepository.getProductbyCategoryId = (id: string) => Promise.resolve([ mockProductResolved ]);

        const products = await productsService.getProductbyCategoryId('1');

        expect(products).toEqual([ mockProductResolved ]);
    }
    )

    it('should get product by id', async () => {
        mockProductRepository.getProductbyId = (id: string) => Promise.resolve(mockProductResolved);

        const product = await productsService.getProduct('12341234-123412341-14wegw123-123');

        expect(product).toEqual(mockProductResolved);
    })
})
