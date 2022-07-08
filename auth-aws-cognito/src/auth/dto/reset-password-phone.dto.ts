import { QueryOutput } from "src/common/output.dto";

export class AuthResetPasswordPhoneDtoInput {
    phone: string;
    verificationCode: string;
    newPassword: string;
}

export class AuthResetPasswordPhoneDtoOutput extends QueryOutput {}