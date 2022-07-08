import { QueryOutput } from "src/common/output.dto";

export class AuthResetPasswordEmailDtoInput {
    email: string;
    verificationCode: string;
    newPassword: string;
}

export class AuthResetPasswordEmailDtoOutput extends QueryOutput {}