import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ) { }

    async findAll(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();

        if (!products || products.length === 0) {
            throw new NotFoundException('not found products')
        }

        return products
    }

    async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(createProduct.categoryId)

        return this.productRepository.save({
            ...createProduct
        })

    }

    async findProductById(productId: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({
            where: {
                id: productId,
            }
        })
        if (!product) {
            throw new NotFoundException(`Product id: ${productId} not found`)
        }

        return product
    }

    async deleteProduct(productId: number): Promise<DeleteResult> {
        await this.findProductById(productId)

        return this.productRepository.delete({ id: productId })
    }

    async updateProduct(updateProduct: UpdateProductDto, productId: number): Promise<ProductEntity>{
        const product = await this.findProductById(productId)
        return this.productRepository.save({
            ...product,
            ...updateProduct
        })
    }
}
