import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { RegisterDto } from "src/auth/dto/register.dto";

@ValidatorConstraint({name: "isPasswordMatching", async: false})
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
    public validate(passwordRepeat: string, args: ValidationArguments) {
        const obj = args.object as RegisterDto
        return obj.password === passwordRepeat
    }
    public defaultMessage(): string {
        return "Passwords doesn't match"
    }
}