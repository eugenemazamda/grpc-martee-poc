import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { 
    CategoriesServiceClient, 
    CATEGORIES_SERVICE_NAME, 
    CreateCategoryRequest, 
    CreateCategoryResponse, 
    DeleteOneResponseCategory, 
    FindOneResponseCategory, 
    UpdateCategoryResponse 
} from 'src/categories/categories.pb';


@ApiTags('Categories courses')
@Controller('categories')
export class CategoriesController {
    private categorySvc: CategoriesServiceClient;

    @Inject(CATEGORIES_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.categorySvc = this.client.getService<CategoriesServiceClient>(CATEGORIES_SERVICE_NAME);
    }

    @Post('create-category')
    @UseGuards(AuthGuard)
    private async createCategory(
        @Body() body: CreateCategoryRequest
    ): Promise<Observable<CreateCategoryResponse>> {
        return this.categorySvc.createCategory(body);
    }

    @Get()
    @UseGuards(AuthGuard)
    private async getAllCategory() {
        return this.categorySvc.getAllCategory({})
    }

    @Get(':id/get-category')
    @UseGuards(AuthGuard)
    private async findOne(
        @Param('id') id: string
    ): Promise<Observable<FindOneResponseCategory>> {
        return this.categorySvc.findOne({ id });
    }

    @Patch(':id/update-catgory')
    private async updateCategory(
        @Param('id') id: string
    ): Promise<Observable<UpdateCategoryResponse>> {
        return this.categorySvc.updateCategory({ id });
    }

    @Delete(':id/delete-category')
    @UseGuards(AuthGuard)
    private async deleteOneCategory (
        @Param('id') id: string
    ): Promise<Observable<DeleteOneResponseCategory>> {
        return this.categorySvc.deleteOneCategory({ id })
    }
}
