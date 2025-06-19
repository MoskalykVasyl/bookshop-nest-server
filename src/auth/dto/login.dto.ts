import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
     @IsString({ message: 'Email must be string' })
      @IsNotEmpty({ message: "Email can't be empty" })
      @IsEmail({}, { message: 'Bad email format' })
      email: string;
    
      @IsString({ message: 'Password must be string' })
      @IsNotEmpty({ message: "Password can't be empty" })
      @MinLength(6, { message: 'Min length of password must be 6' })
      password: string;
}