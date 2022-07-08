/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'categories';

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface CreateCategoryResponse {
  status: number;
  error: string[];
  id: string;
}

/** FindOne */
export interface FindOneDataCategory {
  id: string;
  name: string;
  description: string;
}

export interface FindOneRequestCategory {
  id: string;
}

export interface FindOneResponseCategory {
  status: number;
  error: string[];
  data: FindOneDataCategory | undefined;
}

export interface GetAllCategoryRequest {}

export interface GetAllCategoryResponse {
  data: FindOneDataCategory[];
}

/** Update category */
export interface UpdateCategoryRequest {
  id: string;
}

export interface UpdateCategoryResponse {
  status: number;
  error: string[];
  data: FindOneDataCategory | undefined;
}

/** Delete */
export interface DeleteOneRequestCategory {
  id: string;
}

export interface DeleteOneResponseCategory {
  status: number;
  error: string[];
  id: string;
}

export const CATEGORIES_PACKAGE_NAME = 'categories';

export interface CategoriesServiceClient {
  createCategory(
    request: CreateCategoryRequest,
  ): Observable<CreateCategoryResponse>;

  findOne(request: FindOneRequestCategory): Observable<FindOneResponseCategory>;

  getAllCategory(
    request: GetAllCategoryRequest,
  ): Observable<GetAllCategoryResponse>;

  updateCategory(
    request: UpdateCategoryRequest,
  ): Observable<UpdateCategoryResponse>;

  deleteOneCategory(
    request: DeleteOneRequestCategory,
  ): Observable<DeleteOneResponseCategory>;
}

export interface CategoriesServiceController {
  createCategory(
    request: CreateCategoryRequest,
  ):
    | Promise<CreateCategoryResponse>
    | Observable<CreateCategoryResponse>
    | CreateCategoryResponse;

  findOne(
    request: FindOneRequestCategory,
  ):
    | Promise<FindOneResponseCategory>
    | Observable<FindOneResponseCategory>
    | FindOneResponseCategory;

  getAllCategory(
    request: GetAllCategoryRequest,
  ):
    | Promise<GetAllCategoryResponse>
    | Observable<GetAllCategoryResponse>
    | GetAllCategoryResponse;

  updateCategory(
    request: UpdateCategoryRequest,
  ):
    | Promise<UpdateCategoryResponse>
    | Observable<UpdateCategoryResponse>
    | UpdateCategoryResponse;

  deleteOneCategory(
    request: DeleteOneRequestCategory,
  ):
    | Promise<DeleteOneResponseCategory>
    | Observable<DeleteOneResponseCategory>
    | DeleteOneResponseCategory;
}

export function CategoriesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createCategory',
      'findOne',
      'getAllCategory',
      'updateCategory',
      'deleteOneCategory',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('CategoriesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('CategoriesService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const CATEGORIES_SERVICE_NAME = 'CategoriesService';
