import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '..', '.env') });

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  ...(mode === 'webview' ? {} : {}),
}));
