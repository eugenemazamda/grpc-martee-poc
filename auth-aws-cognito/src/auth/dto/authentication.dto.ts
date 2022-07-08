import { CognitoIdToken } from "amazon-cognito-identity-js";
import { QueryOutput } from "src/common/output.dto";

// export class AuthenticatePhoneDtoInput {
//     phone: string;
//     password: string;
// }

export class AuthenticateEmailDtoInput {
    email: string;
    password: string;
}

export class AuthenticateDtoOutput extends QueryOutput {
    token?: string;
    refresh_token?: string;
    cognito_userId?: CognitoIdToken;
}