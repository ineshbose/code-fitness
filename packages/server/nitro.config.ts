import { defineNitroConfig } from 'nitropack';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '..', '.env') });

export default defineNitroConfig({
  storage: {
    db: {
      driver: 'redis',
      url: process.env.REDIS_URL,
      maxRetriesPerRequest: null,
    },
  },
});
