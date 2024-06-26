import { BadRequestException, Injectable } from '@nestjs/common';
import { Orders } from './orders.entity';
import { OrdersRepository } from './orders.repository';
@Injectable()
export class OrdersService {
  
    constructor( private readonly ordersRepository: OrdersRepository  ) {}

   async addOrder( userId: string, productIds: string[]): Promise<Orders> {
         
        const orders =  this.ordersRepository.addOrder(userId, productIds);
        if(!orders) throw new BadRequestException('Order not created');
        return orders
    
    }

    
    async getOrder( userId: string): Promise<Orders> {
        const order =  this.ordersRepository.getOrder(userId);
        if(!order) throw new BadRequestException('Order not found');
        return order

    }
    async getOrders(): Promise<Orders[]> {

        const orders =  this.ordersRepository.getOrders();
        if(!orders) throw new BadRequestException('Orders not found');
        return orders
    }
}
