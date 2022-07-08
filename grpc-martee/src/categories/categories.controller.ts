import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CATEGORIES_SERVICE_NAME, CreateCategoryResponse, DeleteOneResponseCategory, FindOneResponseCategory, UpdateCategoryResponse } from 'src/categories/categories.pb';
import { CreateCategoryRequestDto, DeleteOneRequestCategoryDto, FindOneRequestCategoryDto, UpdateCategoryRequestDto } from './dtos/category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {

    @Inject(CategoriesService)
    private readonly categorieService: CategoriesService;

    @GrpcMethod(CATEGORIES_SERVICE_NAME, 'CreateCategory')
    private createCategory(payload: CreateCategoryRequestDto): Promise<CreateCategoryResponse> {
        return this.categorieService.createCategory(payload);
    }

    @GrpcMethod(CATEGORIES_SERVICE_NAME, 'FindOne')
    private findOne(payload: FindOneRequestCategoryDto): Promise<FindOneResponseCategory> {
        return this.categorieService.findOneCategory(payload);
    }

    @GrpcMethod(CATEGORIES_SERVICE_NAME, 'GetAllCategory')
    private async getAllCategory() {
        return this.categorieService.getAllCategory();
    }

    // @GrpcMethod(CATEGORIES_SERVICE_NAME, 'UpdateCategory')
    // private updateCategory(
    //     payload: UpdateCategoryRequestDto,
    // ): Promise<UpdateCategoryResponse> {
    //     return this.categorieService.updateCategory(payload);
    // }

    @GrpcMethod(CATEGORIES_SERVICE_NAME, 'DeleteOneCategory')
    private deleteOneCategory(payload: DeleteOneRequestCategoryDto): Promise<DeleteOneResponseCategory> {
        return this.categorieService.deleteOneCategory(payload);
    }
}
