import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async getCache<T>(key: string, functionRequest: () => Promise<T>): Promise<T> {
        const alldata: T = await this.cacheManager.get(key)
        if (alldata) {
            return alldata
        }

        const cities: T = await functionRequest()

        await this.cacheManager.set(key, cities)

        return cities
    }
}
