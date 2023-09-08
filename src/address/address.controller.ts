import { Controller, Post, UsePipes, ValidationPipe, Param, Body, Get } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entites/address.entity';
import { AddressService } from './address.service';
import { UserType } from '../user/enum/use-type.enum';
import { Roles } from '../decorators/roles.decoractors';
import { UserId } from '../decorators/user-id-decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) { }

    @Roles(UserType.User, UserType.Admin)
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(@Body()
    createAddressDto: CreateAddressDto, @UserId() userId: number
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId)
    }


    @Get()
    async findAddressByUserId(
        @UserId() userId: number
    ): Promise<ReturnAddressDto[]> {
        return (await this.addressService.findAddressByUserId(userId))
            .map((address) => new ReturnAddressDto(address))
    }
}
