import { QueryOutput } from "src/common/output.dto";

export class AuthConfirmPasswordDtoInput {
    email: string;
    code: string;
    newPassword: string;
}

export class AuthConfirmPasswordDtoOutput extends QueryOutput {}