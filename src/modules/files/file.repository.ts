import {  Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Files } from "./file.entity"
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "../products/products.entity";
@Injectable()
export class FileRepository extends Repository<Files> {

    constructor(@InjectRepository (Files) private fileRepository: Repository<Files>, 
    @InjectRepository(Products) private productsRepository: Repository<Products>) {
        super(fileRepository.target, fileRepository.manager, fileRepository.queryRunner);
    }

    getFiles(): Promise<Files[]> {
        return this.fileRepository.find();
    }

   async updateProductImage(id: string, file: string): Promise<Products | undefined  > {
        const foundProduct = await this.productsRepository.findOneBy({id});
        if (!foundProduct) return undefined; 

        foundProduct.imgUrl= file;
        return this.productsRepository.save(foundProduct);

    }

}  