import { defineNitroConfig } from 'nitropack';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '..', '.env') });

export default defineNitroConfig({
  routeRules: { '/wakaproxy/**': { cors: true } },
  storage: {
    db: {
      driver: 'redis',
      url: process.env.REDIS_URL,
    },
  },
});
