import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import {Categories} from '../categories/categories.entity';
import {v4 as uuid} from 'uuid';
import { OrderDetails } from '../orders/orderDetails.entity';
@Entity( { name: 'products' } )
export class Products {
    @PrimaryGeneratedColumn( 'uuid' )
    id: string = uuid();
    @Column( { length: 50 , nullable: false}  )
    name: string;
    @Column( { nullable: false}  )
    description: string;
    @Column( { type: 'decimal', precision: 10, scale: 2, nullable: false} )
    price: number;
    @Column( { type: 'int', nullable: false} )
    stock: number;
    @Column( { default: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=400&q=80',  nullable: true} )
    imgUrl?: string;
    
    @ManyToOne( () => Categories, categories => categories.products )
    categories: Categories
    
    @ManyToMany(()=> OrderDetails , orderDetails => orderDetails.products)
    @JoinTable()
    orderDetails: OrderDetails[];
}






