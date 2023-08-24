import { Injectable } from '@nestjs/common';
import { CityEntity } from './entites/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>
    ) { }

    async getAllCityByState(stateId: number): Promise<CityEntity[]> {
        return this.cityRepository.find({
            where: {
                stateId
            }
        })
    }
}
