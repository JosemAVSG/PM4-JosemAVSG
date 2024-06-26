import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn } from "typeorm";
import { Products } from "../products/products.entity";
import { Orders} from "./orders.entity";
import { v4 as uuid } from "uuid";
@Entity('order_details')
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @OneToOne(() => Orders, order => order.orderDetails)
    @JoinColumn()
    order_id: Orders;

    @ManyToMany(() => Products, product => product.orderDetails)
    products: Products[];
    
}