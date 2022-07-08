import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryResponse, DeleteOneResponseCategory, FindOneResponseCategory, UpdateCategoryResponse } from 'src/categories/categories.pb';
import { Repository } from 'typeorm';
import { CreateCategoryRequestDto, DeleteOneRequestCategoryDto, FindOneRequestCategoryDto, UpdateCategoryRequestDto } from './dtos/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
    @InjectRepository(Category)
    private readonly repository: Repository<Category>;

    public async findOneCategory(
        { id }: FindOneRequestCategoryDto
    ): Promise<FindOneResponseCategory> {
        const category: Category = await this.repository.findOne({ where: { id }});

        if(!category) {
            return { data: null, error: ['Category not found'], status: HttpStatus.NOT_FOUND };
        }

        return { data: category, error: null, status: HttpStatus.OK}
    }

    // Get all category
    public async getAllCategory() {
        const data =  await this.repository.find();
        return {
            data
        }
    }

    // Create category new
    public async createCategory(
        payload: CreateCategoryRequestDto
    ): Promise<CreateCategoryResponse> {

        // Condition to check name categorie exist 
        const { name } = payload
        const categorie = await this.repository.findOne({ where: { name }});
        if (categorie) {
            return { id: `This category ${name}`, error: ['Categorie name already exists!!!'], status: HttpStatus.CONFLICT };
        }

        // Save category
        const category: Category = new Category();

        category.name = payload.name;
        category.description = payload.description;

        await this.repository.save(category);

        return { id: category.id, error: null, status: HttpStatus.OK };
    }

    // update category
    // public async updateCategory(
    //     updateCategory: UpdateCategoryRequestDto
    // ): Promise<UpdateCategoryResponse> {
    //     const { name } = updateCategory;
    //     // check if categorie name exists
    //     if (!name) {
    //         return { status: HttpStatus.NOT_FOUND, error: ['The categorie name not found'], data: null }
    //     }
        
    //     try {
    //         await this.repository.save({ id, ...{name}});
    //         const categories = await this.repository.findOne(id);
    //         return { status: HttpStatus.OK, error: null, data: categories };
    //     } catch {
    //         return { status: HttpStatus.NOT_FOUND, error: ['Category not found or not exists...'], data: null };
    //     }
    // }

    // Delete category
    public async deleteOneCategory(
        { id }: DeleteOneRequestCategoryDto
    ): Promise<DeleteOneResponseCategory> {
        const category: Category = await this.repository.findOne({ where: { id }});

        if (!category) {
            return { status: HttpStatus.NOT_FOUND, error: ['Category not found'], id: category.id };
        }
        await this.repository.delete({ id });

        return { status: HttpStatus.OK, error: null, id: category.id };
    }
}