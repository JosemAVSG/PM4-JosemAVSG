import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { Orders } from '../orders/orders.entity';
@Entity({name: 'users'})
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id:  string = uuid();
    
    @Column({type: 'varchar', length: 50})
    name: string;
    
    @Column({unique: true, type: 'varchar', length: 50, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 60, nullable: false})
    password: string;

    @Column({type: 'int'})
    phone: number;
    
    @Column({type: 'varchar', length: 50})
    country: string;

    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'varchar', length: 50})
    city: string;

    @Column({default:false})
    isAdmin: boolean

    @OneToMany(() => Orders , (orders) => orders.user_id)
    orders_id: Orders[];

}


