import {Test} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {JwtService} from '@nestjs/jwt';
import {UsersRepository} from '../users/users.repository';
import { Users } from '../users/users.entity';
import { CreateUserDto } from '../../interfaces/dtos/createUser.dto';
import { BadRequestException } from '@nestjs/common';
describe('AuthService', () => {
    let authService: AuthService;
    let mockUsersService: Partial<UsersRepository>
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
    beforeEach(async () => {
    mockUsersService = {
            getUserByEmail: ( email:string) => Promise.resolve( undefined ),                
            save: (user ) => Promise.resolve({...user,isAdmin: false,id:'1232fs-fsf32-32323-323fsfg'}),    
            createUser: (user: Omit<Users, 'id'> ) => Promise.resolve({...user,isAdmin: false,id:'1232fs-fsf32-32323-323fsfg'}),
        };
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                JwtService,
                {
                    provide: UsersRepository,
                    useValue: mockUsersService
                }

            ]
        }).compile();
    
    
        authService = module.get<AuthService>(AuthService);

    })
    it('Create an Instance of AuthService', async () => {
        expect(authService).toBeDefined();
    })

    it ('SingUp is defined', async () => {
        const user = await authService.singUp(mockUser);
        expect(user).toBeDefined();

    })
    it ('singIn should throw an error if user is not found', async () => {
        await expect(authService.singIn('test', 'test')).rejects.toThrow(BadRequestException);
    })
    it ('singIn should throw an error if password is not valid', async () => {
        mockUsersService.getUserByEmail = ( email:string) => Promise.resolve( mockUser as Users );
        try {
            await authService.singIn('test', 'dasdas');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })
    it ('singUp should throw an error if user already exists', async () => {
        mockUsersService.getUserByEmail = ( email:string) => Promise.resolve( mockUser as Users );
        try{
            await authService.singUp(mockUser);
        }
        catch(error){
            expect(error).toBeInstanceOf(BadRequestException);
        }
    })


})