import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decoractors';
import { UserType } from 'src/user/enum/use-type.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dtos/update-product.dto';


@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    async findAll(): Promise<ReturnProduct[]> {
        return (await this.productService.findAll()).map((product) => new ReturnProduct(product))
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProductDto): Promise<ProductEntity> {
        return this.productService.createProduct(createProduct)
    }

    @Roles(UserType.Admin)
    @Delete('/:productId')
    async deleteProduct(@Param('productId') productId: number): Promise<DeleteResult> {
        return this.productService.deleteProduct(productId)
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Put('/:productId')
    async updateProduct(@Param('productId') productId: number, @Body() updateProduct: UpdateProductDto): Promise<ProductEntity> {
        return this.productService.updateProduct(updateProduct, productId)
    }
}
