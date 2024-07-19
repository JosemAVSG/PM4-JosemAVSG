import { Controller, Delete, Get, Put, Param, Res, Body, Query, UseGuards, ParseUUIDPipe, NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateUserDto } from '../../interfaces/dtos/createUser.dto';
import { RoleGuard } from '../../guards/role.guard';
import { Role } from '../../decorators/roles.decorator';
import { Roles } from '../../interfaces/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    @Role(Roles.ADMIN)
    @UseGuards(RoleGuard)
    @ApiBearerAuth()
    async getUsers( @Res () res: Response, @Query('page') page: number = 1, @Query('limit') limit: number = 5) {
        
        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 5;
        try {
            const result = await this.usersService.getUsers( pageNumber, limitNumber );
                res.status(200).send(result);
            
        } catch (error) {   
            throw new NotFoundException('Users not found !'+ error);
        }
    }
   
    @Get(':id')
    async getUser(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {

        try {
            const user  = await this.usersService.getUserbyId(id);   
            res.status(200).send(user);
            
        } catch (error) {
           throw new NotFoundException('User not found !'+ error);
        }
    }

    @Put(':id')
    async updateUser( @Param('id', ParseUUIDPipe) id: string, @Res() res: Response, @Body() user: CreateUserDto) {
       try{
        const updateUser =  await this.usersService.updateUser(id, user);
        res.status(200).send({message: 'updateUser', updateUser}); 
    }
        catch(error){
            throw new NotFoundException('User not updated !'+ error);
        }      
    }
    @ApiBearerAuth()
    @Delete(':id')
    async deleteUser( @Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
        
        try {
            const deleteUser = await this.usersService.deleteUser(id);   
            
            res.status(200).send({message: 'deleteUser', deleteUser });
            
        } catch (error) {
            throw new NotFoundException('User not deleted !'+ error);
        }
        
    }

}
