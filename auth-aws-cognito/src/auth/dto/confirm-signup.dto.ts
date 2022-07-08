import { QueryOutput } from "src/common/output.dto";

export class AuthConfirmationDtoInput{
  email: string;
  code: string;
}

export class AuthConfirmationDtoOutput extends QueryOutput{
}