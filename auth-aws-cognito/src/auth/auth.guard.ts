import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { ValidateResponse } from "./dto/validate-response.dto";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
    ) {}


    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const cookie = request.cookies['jwt'];

        return true;
    }
}