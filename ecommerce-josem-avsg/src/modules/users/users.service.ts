import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { CreateUserDto } from 'src/interfaces/dtos/createUser.dto';
@Injectable()
export class UsersService {
    constructor( private usersRepository: UsersRepository) {}
    async getUsers( page: number, limit: number): Promise<Omit<Users, 'password'>[]> {

        const result = await this.usersRepository.getUsers( page, limit);
        
        const users = result.map(user => {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword
        });        
        return users;
    }

    async getUserbyId(id: string) : Promise<Omit<Users, 'password'>> {
        const result = await this.usersRepository.getUserbyId(id);
        if(!result) throw new NotFoundException('User not found !');
        const {password, ...userWithoutPassword} = result
        return userWithoutPassword
    }

     async createUser(user: CreateUserDto): Promise<Omit<Users, 'password'>> {
        const User = await this.usersRepository.createUser(user);
        return User;
    } 

    async updateUser(id: string, user: CreateUserDto) {
        return this.usersRepository.updateUser(id, user);

    }

     async deleteUser(id: string) {
        return this.usersRepository.deleteUser(id); 

    }
}
