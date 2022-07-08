import { QueryOutput } from "src/common/output.dto";

export class AuthRegisterDtoInput {
    phone: string;
    email: string;
    password: string;
}

export class AuthRegisterDtoOutput extends QueryOutput {}