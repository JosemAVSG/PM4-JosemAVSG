import { IsNotEmpty, IsEmail, IsString, Length, Matches, IsNumberString, IsEmpty } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString() 
    @IsNotEmpty()
    @Length(8, 15)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%._^&*])/, 
    { message: 'password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',  })   
    password: string;

    @IsString() 
    @IsNotEmpty()
    @Length(8, 15)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%._^&*])/, 
    { message: 'password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',  })   
    confirmPassword: string;

    @IsString()
    @Length(3, 80)
    @IsNotEmpty()
    address: string;

    @IsNumberString()
    @IsNotEmpty()
    phone: number;
    
    @IsString()
    @Length(5, 20)
    @IsNotEmpty()
    country: string;
    
    @IsString()
    @Length(5, 20)
    @IsNotEmpty()
    city: string;

    @IsEmpty()
    isAdmin: boolean

}
