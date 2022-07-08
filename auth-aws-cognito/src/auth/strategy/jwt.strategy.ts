import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthConfig } from "src/configuration/auth.config";
import { UserService } from "src/user/user.service";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService,
        private authConfig: AuthConfig,
        private userService: UserService
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
              }),
            
              jwtFromRequest: ExtractJwt.fromExtractors([
                  (request: Request) => {
                    const data  = request?.cookies["jwt"];
                    if(!data) {
                        return null
                    }
                    return data;
                  },
                //   JwtStrategy.extractJWT,
                  ExtractJwt.fromAuthHeaderAsBearerToken()
              ]),
              ignoreExpiration: false,
              audience: authConfig.clientId,
              issuer: authConfig.authority,
              algorithms: ['RS256'],
            });
    }

    public async validate(payload: any) {
        const { user } = await this.userService.findUserById(payload.sub);
        return user;
    }
}