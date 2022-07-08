import { QueryOutput } from "src/common/output.dto";

export class CreateUserDtoInput {
    readonly cognito_userId: string;
    readonly email: string;
    readonly phone: string;
}

export class CreateUserDtoOutput extends QueryOutput {}
