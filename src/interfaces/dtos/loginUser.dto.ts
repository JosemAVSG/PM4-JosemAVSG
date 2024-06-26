import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";
export class LoginUserDto {

    /**
     * @example "usuario212@mail.com"
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * @example "Alexa_2528."
     */
    @IsString() 
    @IsNotEmpty()
    @Length(8, 15)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%._^&*])/, 
    { message: 'password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',  })   
    password: string;

}
