import { Module, CacheModule } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entites/city.entity';

@Module({
  imports: [CacheModule.register({
    ttl: 9000000,
  }), TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule { }
