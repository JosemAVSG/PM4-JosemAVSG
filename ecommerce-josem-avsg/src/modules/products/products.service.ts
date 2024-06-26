import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.entity';
import { CreateProductDto } from 'src/interfaces/dtos/createProduct.dto';
@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository){}

    async getProducts( page : number, limit : number) {
        return  await this.productsRepository.getProducts(page, limit);
    }
    async getProductbyCategoryId(id: string) {
        return  await this.productsRepository.getProductbyCategoryId(id);
    }
    async getProduct(id: string) {
        return  await this.productsRepository.getProductbyId(id);
    }

    async createProduct(product: CreateProductDto) {  
        return await this.productsRepository.createProduct(product);
    }

    async updateProduct(id: string , product: Products) {
        return await this.productsRepository.updateProduct(id, product);
    }

    async deleteProduct(id: string) {
        return await this.productsRepository.deleteProduct(id);
    }
}