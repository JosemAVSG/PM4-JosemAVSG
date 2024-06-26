import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import {v4 as uuid} from 'uuid';
import { OrderDetails } from './orderDetails.entity';
@Entity('orders')
export class Orders {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @ManyToOne(() => Users, (user) => user.orders_id)
    user_id: Users

    @Column({ type: 'timestamp' })
    date: Date;

    @OneToOne(() => OrderDetails , (orderDetails) => orderDetails.order_id)
    // @JoinColumn()
    orderDetails: OrderDetails;
    
}
