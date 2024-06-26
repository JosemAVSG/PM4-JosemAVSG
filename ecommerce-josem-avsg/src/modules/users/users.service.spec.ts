import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Users } from "./users.entity";
import { UsersRepository } from "./users.repository";
import { Orders } from "../orders/orders.entity";
import { OrderDetails } from "../orders/orderDetails.entity";
import { CreateUserDto } from "../../interfaces/dtos/createUser.dto";

describe('UsersService', () => {    
    let usersService: UsersService;
    let mockusersRepository: Partial<UsersRepository>

    const mockUser: CreateUserDto = {
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        phone: 123456789,
        country: 'test',
        address: 'test',
        city: 'test',
        isAdmin: false

    }
    const mockUSerResponse = {
        name: 'test',
        email: 'test@test.com',
        phone: 123456789,
        country: 'test',
        address: 'test',
        city: 'test',
        isAdmin: false
    }

    beforeEach(async () => {
        mockusersRepository = {
            getUserByEmail: (email: string) => Promise.resolve(undefined),
            getUserbyId: (id: string) =>  Promise.resolve(mockUser as Users),
            updateUser: (id: string, user: Partial<Users>) => Promise.resolve(mockUser as Users),
            deleteUser: (id: string) => Promise.resolve(undefined),
        }
    
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: mockusersRepository
                }
            ]
        }).compile();
    
        usersService = module.get<UsersService>(UsersService);
    })

    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });

    it('should throw an error if user is not found', async () => {
        mockusersRepository.getUserbyId= (id: string) =>  Promise.resolve(mockUser as Users);
        try {
            await  usersService.getUserbyId('test');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });

    it('should return a user without password', async () => {
        mockusersRepository.getUserbyId= (id: string) =>  Promise.resolve(mockUSerResponse as Users);
        const user = await usersService.getUserbyId('test');
        expect(user).toEqual(mockUSerResponse);
    });
    
    it('should update a user', async () => {
        const user = await usersService.updateUser('test', mockUser);
        expect(user).toEqual(mockUser);
    });

    it('should delete a user', async () => {
        const user = await usersService.deleteUser('test');
        expect(user).toEqual(undefined);
    })
    
    })