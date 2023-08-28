import { Controller, Post, UsePipes, ValidationPipe, Param, Body } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entites/address.entity';
import { AddressService } from './address.service';
import { UserType } from 'src/user/enum/use-type.enum';
import { Roles } from 'src/decorators/roles.decoractors';
import { UserId } from 'src/decorators/user-id-decorator';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) { }

    @Roles(UserType.User)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(@Body() createAddressDto: CreateAddressDto, @UserId() userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId)
    }
}
