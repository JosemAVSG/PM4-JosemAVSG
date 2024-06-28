import {
  Body,
  Controller,
  Post,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../../interfaces/dtos/loginUser.dto';
import { CreateUserDto } from '../../interfaces/dtos/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../../interfaces/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signin')
  async getAuth(@Res() res: Response, @Body() credential: LoginUserDto) {
    const { email, password } = credential;
    try {
      if (!email || !password) {
        throw new Error('No credentials provided!');
      }
        const result = await this.authService.singIn(email, password);
      if (!result) {
        res.status(401).send('You are not authenticated!');
      }
      
    const userPayload ={
        id: result.id,
        sub: result.id,
        email: result.email,
        roles:[result.isAdmin ? Roles.ADMIN : Roles.USER]
      }
  
     const token = this.jwtService.sign(userPayload);
     
      res.status(201).send({ message: 'You are authenticated!', token });
    } catch (error) {
      res.status(401).send(`${error}`);
    }
  }

  @Post('signup')
  async createUser(@Res() res: Response,@Body() user: CreateUserDto  ) {
    
    if (user.password !== user.confirmPassword||!user.password ||!user.confirmPassword) {
      throw new BadRequestException('Passwords do not match!');
    }
    try {

      const newUser = await this.authService.singUp(user);

      const userPayload = {
        id: newUser.id,
        sub: newUser.id,
        email: newUser.email,
      };

      const token = this.jwtService.sign(userPayload);
        

      res.status(200).send({ message: 'User Created', newUser, token });
    } catch (error) {
      throw new BadRequestException('User not created !' + error);
    }
  }
}
