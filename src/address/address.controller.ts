import { Controller,Post, UsePipes, ValidationPipe, Param, Body } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entites/address.entity';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) { }

    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(@Body() createAddressDto: CreateAddressDto, @Param('userId') userId: number): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDto, userId)
    }
}