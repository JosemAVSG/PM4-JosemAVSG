import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator"
import { Products } from "src/modules/products/products.entity"
export class CreateOrderDto {
    @IsUUID()
    userId: string
    
    @IsArray()
    @ArrayNotEmpty()
    products: Partial<Products>[]
}

// CreateOrderDto

// userId: Se requiere que el userId no esté vacío y cumpla con el formato de UUID.
// products: Se espera que products sea un array que contenga al menos un elemento. Cada elemento del array debe ser un objeto parcial de la entidad Product