import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [sveltekit()],
  ...(mode === 'webview'
    ? {
        build: {
          // outDir: '../extension/dist/app',
          // emptyOutDir: true,
        },
      }
    : {}),
}));
