import { Injectable, NotFoundException } from "@nestjs/common";
import { Products } from "./products.entity"
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "../categories/categories.entity";
import { CreateProductDto } from "src/interfaces/dtos/createProduct.dto";

@Injectable()
export class ProductsRepository extends Repository<Products> {

    constructor (@InjectRepository(Products) private productsRepository: Repository<Products>,
@InjectRepository(Categories) private categoriesRepository: Repository<Categories>) {
        super(productsRepository.target, productsRepository.manager, productsRepository.queryRunner);
    }
    async getProducts( page: number, limit: number): Promise<Products[]> {
    
        const foundProducts = await this.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: { categories: true },
        })
        return foundProducts
    }

    async getProductbyCategoryId(id: string) {
        
        const foundProducts = await this.find({
            where: { categories: { id: id } },
            relations: { categories: true },
        })
        return foundProducts
    }
    async getProductbyId(id: string) {     

        const foundProduct = await this.productsRepository.findOne({where: {id}})
        return foundProduct;

    }

    async createProduct(product: CreateProductDto): Promise<Products> {
        const { name, description, price, stock, imgUrl, categoriaId  } = product
     
        const categoriesFound = await this.categoriesRepository.findOne({where: {id:categoriaId }})
        if (!categoriesFound) throw new NotFoundException('category not found');
        
        const newProduct = this.productsRepository.create({
            name,
            description,
            price,
            stock,
            imgUrl
        })
       newProduct.categories = categoriesFound;
       await this.productsRepository.save(newProduct)   
        return newProduct
    }

    async updateProduct(id:string, product: Partial<Products>): Promise<Products> {

        const productFound = await this.findOneBy({id});
        if (!productFound) return undefined;
        const productUpdated = {...productFound, ...product}
        return this.save(productUpdated);
    }

    async deleteProduct(id: string ) {

        const user = await this.findOne({ where: { id } });
        if (user) {
          await this.remove(user);
        }

    }

}  