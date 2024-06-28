import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator"
import { Products } from "src/modules/products/products.entity"
export class CreateOrderDto {
    @IsUUID()
    userId: string
    
    @IsArray()
    @ArrayNotEmpty()
    products: Partial<Products>[]
}

