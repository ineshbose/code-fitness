import type { CacheOptions } from 'nitropack';
import type { QueryObject } from 'ufo';

const commonCacheOptions: CacheOptions = {
  group: 'wt',
  swr: true,
  maxAge: 60 * 60 * 6, // 6 hours
  staleMaxAge: 60 * 60 * 12, // 12 hours
};

const cacheOptions = (name: string): CacheOptions => ({
  ...commonCacheOptions,
  name,
});

// eslint-disable-next-line import/prefer-default-export
export const wakaFetch = cachedFunction(
  (url: string, params: QueryObject = {}) =>
    $fetch(url, { baseURL: 'https://api.wakatime.com/api/v1', params }),
  cacheOptions('api')
);
