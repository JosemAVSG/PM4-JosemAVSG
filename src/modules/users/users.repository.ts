import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/interfaces/dtos/createUser.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {

  constructor( @InjectRepository(Users) private usersRepository: Repository<Users> ) {
    super (usersRepository.target, usersRepository.manager, usersRepository.queryRunner);
  }

 public async getUsers(page: number, limit: number): Promise<Users[]> {

    return await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    })

  }

  public async getUserbyId(id: string ) : Promise<Users> {
    
      return await this.usersRepository.findOne({
        where: { id },
        relations: {
          orders_id: true,
        },
      });
    
  }

  public async createUser(user: Partial<CreateUserDto>): Promise<Omit<Users, 'password'>> {
    
    const newUser = this.usersRepository.create(user);
    const userCreated = await this.usersRepository.save(newUser);
    const {password, ...rest}= userCreated
    return rest;
    
  }

  async updateUser(id: string, user: Partial<Users>): Promise<Users | undefined>  {
    
    const userFound = await this.usersRepository.findOneBy({id});
    if (!userFound) return undefined;
    const userUpdated = {...userFound, ...user}
    return this.usersRepository.save(userUpdated);
   

  } 

  async deleteUser(id: string): Promise<void> {

    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {
      await this.usersRepository.remove(user);
    }
   
 
  }

  async getUserByCredentials(email: string, password: string): Promise<Users | null> {
   
    const users  = await this.usersRepository.findOne({ where: { email } });
    if (!users) {
      return null;
    }
    
    const result = users.password === password ? users : null;
    return result

  }
  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
