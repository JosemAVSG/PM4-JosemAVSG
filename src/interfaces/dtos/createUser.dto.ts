import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Length, Matches, IsNumberString, IsEmpty } from 'class-validator';
export class CreateUserDto {

    /**
     * "name": "Juan"
     */

    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    /**
     *   "email": "jmff.43@mail.com"
     */

    @IsEmail()
    @IsNotEmpty()
    email: string;

    /**
     * "password":"contra_123."
     */

    @IsString() 
    @IsNotEmpty()
    @Length(8, 15)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%._^&*])/, 
    { message: 'password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',  })   
    password: string;


    /**
     * "password":"contra_123."
     */


    @IsString() 
    @IsNotEmpty()
    @Length(8, 15)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%._^&*])/, 
    { message: 'password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',  })   
    confirmPassword: string;


        /**
         *   "address": "calle falsa 123"
         */

    @IsString()
    @Length(3, 80)
    @IsNotEmpty()
    address: string;

        /**
         *   "phone": "123456789"
         */

    @IsNumberString()
    @IsNotEmpty()
    phone: number;
    

    /**
     *   "country": "Colombia"
     */
    @IsString()
    @Length(5, 20)
    @IsNotEmpty()
    country: string;
    

    /**
     *   "city": "Bogota"
     */


    @IsString()
    @Length(5, 20)
    @IsNotEmpty()
    city: string;
    
    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean

}
