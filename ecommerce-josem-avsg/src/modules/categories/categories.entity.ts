import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Products } from "../products/products.entity";
import { v4 as uuid } from 'uuid';
@Entity()
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
        type: 'varchar', length: 50})
    name: string;

    @OneToMany(() => Products, (product) => product.categories)
    products: Products[]

}



// Categories

// id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

// name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

// Relación 1:1 con products.

