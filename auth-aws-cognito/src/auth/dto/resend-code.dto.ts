import { QueryOutput } from "src/common/output.dto";

export  class ResendVerifyRequestDtoInput {
    email: string;
}

export class ResendVerifyRequestDtoOutput extends QueryOutput {}