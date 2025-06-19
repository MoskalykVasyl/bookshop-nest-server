import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordMatchingConstraint } from 'src/libs/common/decorators/is-password-matching.decorator';

export class RegisterDto {
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: "Name can't be empty" })
  name: string;

  @IsString({ message: 'Email must be string' })
  @IsNotEmpty({ message: "Email can't be empty" })
  @IsEmail({}, { message: 'Bad email format' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: "Password can't be empty" })
  @MinLength(6, { message: 'Min length of password must be 6' })
  password: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: "Password can't be empty" })
  @MinLength(6, { message: 'Min length of password must be 6' })
  @Validate(IsPasswordMatchingConstraint, {message: 'Password does not match'})
  passwordRepeat: string;
}
