import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from "../auth.dto";
import { User } from "../auth.entity";
import { LoginResponse, RegisterResponse, ValidateResponse } from "../auth.pb";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthService {

    @InjectRepository(User)
    private readonly repository: Repository<User>;

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async register(
        { email, password }: RegisterRequestDto
    ): Promise<RegisterResponse> {
        let auth: User = await this.repository.findOne({ where: { email }});

        if (auth) {
            return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
        }

        auth = new User();

        auth.email = email;
        auth.password = this.jwtService.encodePassword(password);

        await this.repository.save(auth);

        return { status: HttpStatus.CREATED, error: null };
    }

    // loggin
    public async login(
        { email, password }: LoginRequestDto
    ): Promise<LoginResponse> {

        const auth: User = await this.repository.findOne({ where: { email }});

        if (!auth) {
            return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);

        if(!isPasswordValid) {
            return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
        }

        const token: string = this.jwtService.generateToken(auth);

        return { token, status: HttpStatus.OK, error: null };
    }

    // Validate 
    public async validate(
        { token }: ValidateRequestDto
    ): Promise<ValidateResponse> {
        const decoded: User = await this.jwtService.verify(token);

        if (!decoded) {
            return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
        }

        const auth: User = await this.jwtService.validateUser(decoded);

        if(!auth) {
            return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
        }

        return { status: HttpStatus.OK, error: null, userId: decoded.id };
    }
}