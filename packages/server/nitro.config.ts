import { defineNitroConfig } from 'nitropack';

export default defineNitroConfig({
  storage: {
    db: {
      driver: 'redis',
      url: process.env.REDIS_URL,
      maxRetriesPerRequest: null,
    },
  },
});
