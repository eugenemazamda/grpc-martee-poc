import { QueryOutput } from "src/common/output.dto";
import { User } from "../entities/user.entity";

export class FindByUserIdInput {
    cognito_userId: string;
}

export class FindByUserIdOutput extends QueryOutput {
    user?: User;
}