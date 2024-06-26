import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
@Injectable()
export class FilesService {

    constructor(private readonly fileRepo: FileRepository) {}

    async uploadProductImage(id: string, file: string) {
        // const product = await this.productsService.updateProduct();  
        return await this.fileRepo.updateProductImage(id, file);
        
    }
}
