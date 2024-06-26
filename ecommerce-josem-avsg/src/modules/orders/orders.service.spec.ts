import { Test } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { BadRequestException } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { Orders } from "./orders.entity";
import { OrderDetails } from "./orderDetails.entity";

describe('OrdersService', () => {
    let ordersService: OrdersService
    let mockOrdersService: Partial<OrdersRepository>

    const mockOrder: Orders = {
        id: '123',
        user_id: { id: '123', name: 'Test User' } as any, // Adjust the user object as per your Users entity
        date: new Date(),
        orderDetails: { id: '456', order: undefined, product: 'Test Product', quantity: 2 } as any, // Adjust the orderDetails object as per your OrderDetails entity
    };
    
    beforeEach(async () => {

        mockOrdersService = {
             addOrder: ()=> Promise.resolve(undefined),
             getOrder: ()=> Promise.resolve(undefined),
             getOrders: ()=> Promise.resolve([]),
        }

        const module = await Test.createTestingModule({
            providers: [ 
                OrdersService,
                {
                    provide: OrdersRepository,
                    useValue: mockOrdersService
                }
             ]  
        }).compile();

        ordersService = module.get<OrdersService>(OrdersService);
    })

    it('should be defined', () => {
        const service: OrdersService = ordersService
        expect(service).toBeDefined();
    })

    it('should add an order', async () => {
        mockOrdersService.addOrder = () => Promise.resolve(mockOrder as Orders)
        const userId = '123';
        const productIds = ['123', '456'];

        const order = await ordersService.addOrder(userId, productIds);
        expect(order).toEqual(mockOrder)
    })
    
    it('should throw an error if order is not created', async () => {
        mockOrdersService.addOrder = () => Promise.resolve(undefined)
        const userId = '123';
        const productIds = ['123', '456'];
        try {
            await ordersService.addOrder(userId, productIds);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })

    it('should get an order', async () => {
        mockOrdersService.getOrder = () => Promise.resolve(mockOrder as Orders)
        const order = await ordersService.getOrder('123');
        expect(order).toEqual(mockOrder)
    })

    it('should get all orders', async () => {
        mockOrdersService.getOrders = () => Promise.resolve([mockOrder as Orders])
        const orders = await ordersService.getOrders();
        expect(orders).toEqual([mockOrder])
    })

    it('should throw an error if order is not found', async () => {
        mockOrdersService.getOrder = () => Promise.resolve(undefined)
        try {
            await ordersService.getOrder('123');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })

    it('should throw an error if order is not found', async () => {
        mockOrdersService.getOrders = () => Promise.resolve([])
        try {
            await ordersService.getOrders();
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })
})