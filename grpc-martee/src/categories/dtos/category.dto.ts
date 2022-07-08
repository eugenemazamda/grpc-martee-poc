import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { CreateCategoryRequest, DeleteOneRequestCategory, FindOneRequestCategory } from "../../categories/categories.pb";

export class FindOneRequestCategoryDto implements FindOneRequestCategory {
    @IsString()
    public readonly id: string;
}

export class CreateCategoryRequestDto implements CreateCategoryRequest {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly description: string;
}

export class UpdateCategoryRequestDto extends PartialType(CreateCategoryRequestDto) {}

export class DeleteOneRequestCategoryDto implements DeleteOneRequestCategory {
    @IsString()
    public readonly id: string;
}
