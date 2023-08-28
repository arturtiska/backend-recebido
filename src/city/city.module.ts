import { Module, CacheModule as CacheModuleNest } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entites/city.entity';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    CacheModule,
    TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService]
})
export class CityModule { }
