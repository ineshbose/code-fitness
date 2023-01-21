import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  ...(mode === 'webview' ? {} : {}),
}));
