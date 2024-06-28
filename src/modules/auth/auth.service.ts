import {  BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { Users } from '../users/users.entity';
import { hash, isValidPassword } from '../../helpers/hash';
import { CreateUserDto } from '../../interfaces/dtos/createUser.dto';
@Injectable()
export class AuthService {

   constructor (private readonly usersRepository: UsersRepository) {}

 

   async singUp (user: CreateUserDto) : Promise< Omit< Users, 'password'> | undefined> {
   
    const userfound = await this.usersRepository.getUserByEmail(user.email);
    if(userfound) throw new BadRequestException('user already exists')
      
    const hassedPassword = await hash(user.password);
   if(!hassedPassword) throw new BadRequestException('user not created');

    const {confirmPassword, ...rest} = user;

    const newUser =  await this.usersRepository.createUser({...rest, password: hassedPassword});

    return newUser
    
   }

   async singIn(email: string, password: string) : Promise<Users| null> {

    const user = await this.usersRepository.getUserByEmail(email);
    if(!user) throw new BadRequestException('Verification Failed');
    const validPassword = await isValidPassword(password, user.password);
    if(!validPassword) throw new BadRequestException('Verification Failed');


    return user;
   }
}
