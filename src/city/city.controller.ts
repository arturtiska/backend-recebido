import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entites/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(
        private readonly cityService: CityService
    ) { }

    @Get('/:stateId')
    async getAllCityByState(@Param('stateId') stateId: number): Promise<CityEntity[]> {
        return this.cityService.getAllCityByState(stateId)
    }

}
