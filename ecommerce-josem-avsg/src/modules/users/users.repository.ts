import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/interfaces/dtos/createUser.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  // private users: Users[] = [
  //   {
  //     id: 1,
  //     email: 'usuario1@mail.com',
  //     name: 'Juan',
  //     password: '123456',
  //     address: 'Calle 123',
  //     phone: '123456789',
  //   },
  //   {
  //     id: 2,
  //     email: 'usuario2@mail.com',
  //     name: 'Ana',
  //     password: 'abcdef',
  //     address: 'Avenida 456',
  //     phone: '987654321',
  //   },
  //   {
  //     id: 3,
  //     email: 'usuario3@mail.com',
  //     name: 'Pedro',
  //     password: 'hola123',
  //     address: 'Plaza Principal',
  //     phone: '555555555',
  //   },
  // ];
  
  constructor( @InjectRepository(Users) private usersRepository: Repository<Users> ) {
    super (usersRepository.target, usersRepository.manager, usersRepository.queryRunner);
  }

 public async getUsers(page: number, limit: number): Promise<Users[]> {

    return await this.find({
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
    console.log('Repository : ', user);
    
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser
    
    
  }

  async updateUser(id: string, user: Partial<Users>): Promise<Users | undefined>  {
    
    const userFound = await this.findOneBy({id});
    if (!userFound) return undefined;
    const userUpdated = {...userFound, ...user}
    return this.save(userUpdated);
   

  } 

  async deleteUser(id: string): Promise<void> {

    const user = await this.findOne({ where: { id } });
    if (user) {
      await this.remove(user);
    }
   
 
  }

  async getUserByCredentials(email: string, password: string): Promise<Users | null> {
   
    const users  = await this.findOne({ where: { email } });
    if (!users) {
      return null;
    }
    
    const result = users.password === password ? users : null;
    return result

  }
  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.findOne({ where: { email } });
  }
}
