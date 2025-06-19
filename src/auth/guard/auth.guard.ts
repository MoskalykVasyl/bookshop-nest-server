import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { User } from "prisma/__generated__";
import { UserService } from "src/user/user.service";

interface RequsetWithUser extends Request {
    user: User
}

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private readonly userService: UserService) {}

    public async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const request: RequsetWithUser = context.switchToHttp().getRequest();

        if(typeof request.session.userId === 'undefined') {
            throw new UnauthorizedException('User unauthorized')
        }

        const user = await this.userService.findById(request.session.userId)

        request.user = user;

        return true
    }
}