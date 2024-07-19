import { Controller, Body,  Get, Param, Post, Res , ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../../interfaces/dtos/createOrder.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
    constructor( private ordersService: OrdersService) {}
    @Post()
    async addOrder(@Res() res: Response, @Body() body: CreateOrderDto) {
        try {
            const { userId, products } = body;
            const productsID = products.map(product => product.id);
            const order = await this.ordersService.addOrder(userId, productsID);
            res.status(201).json(order);
            
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Order not created !'+ error,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getOrder(@Res() res: Response,@Body() body: { user_id: string}) {

        try {
            const orders = await this.ordersService.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Orders not found !'+ error, 
            }, HttpStatus.NOT_FOUND);
        }

    }
    @Get(':id')
    async getOrderById(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {

        try {   
            const order = await this.ordersService.getOrder(id);
            res.status(200).json(order);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Order not found !'+ error, 
            }, HttpStatus.NOT_FOUND);
        }
    }
}
