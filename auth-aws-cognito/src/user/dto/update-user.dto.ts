import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDtoInput } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDtoInput) {}
