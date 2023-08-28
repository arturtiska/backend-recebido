import { Module, CacheModule as CacheModuleNest } from '@nestjs/common';
import { CacheService } from './cache.service';


@Module({
  imports: [CacheModuleNest.register({
    ttl: 9000000,
  }),],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule { }
