import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { OrderDetails } from "./orderDetails.entity";
import { Users } from '../users/users.entity';
import { Products } from "../products/products.entity";
import { NotFoundException } from "@nestjs/common";

export class OrdersRepository  {
    
    constructor(@InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>) {}

   
    async addOrder( userId: string, productIds: string[]): Promise<Orders> {
        
      let totalPrice=0
      const productsfound: Products[] = [];
      
       const foundUser =  await this.userRepository.findOneBy({id: userId});
      
       if (!foundUser) {
           throw new NotFoundException('User not found');
       }
       
       for (const productId of productIds) {
           const product = await this.productRepository.findOne({
             where: { id: productId, stock: MoreThan(0) },
           });
           if (!product) {
             throw new NotFoundException('Product not found');
           }
           totalPrice += Number (product.price);
           product.stock -= 1;
           productsfound.push(product);
           await this.productRepository.save(product);

       }  
       
        const orders = this.ordersRepository.create({
            user_id: foundUser,
            date: new Date(), 
        })
       const orderSaved= await this.ordersRepository.save(orders);
    
       const orderDetails = this.orderDetailsRepository.create({
         order_id: orders,
          price: totalPrice,
          products: productsfound
       })
       await this.orderDetailsRepository.save(orderDetails);
       
       return await this.ordersRepository.findOne({where: {id:orderSaved.id},relations:{ orderDetails: { products: true}}});
   }

   
   async getOrder( userId: string): Promise<Orders> {

       return await this.ordersRepository.findOne({
           where: { user_id:{id: userId} },
           relations:{ orderDetails: { products: true},}
       });

   }
   async getOrders(): Promise<Orders[]> {
       
       return await this.ordersRepository.find({relations:{ orderDetails:{products:true}}});
   }
}