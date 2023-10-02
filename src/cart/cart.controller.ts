import { Controller } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decoractors';
import { UserType } from 'src/user/enum/use-type.enum';

@Roles(UserType.Admin)
@Controller('cart')
export class CartController { }
