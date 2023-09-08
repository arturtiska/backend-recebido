import { Controller, Get } from '@nestjs/common';
import { ReturnCategory } from './dtos/return-category.dto';
import { CategoryService } from './category.service';
import { UserType } from 'src/user/enum/use-type.enum';
import { Roles } from 'src/decorators/roles.decoractors';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }


    @Get()
    async findAllCategories(): Promise<ReturnCategory[]> {
        return ((await this.categoryService.findAllCategories()).map((category) => new ReturnCategory(category)))
    }
}
