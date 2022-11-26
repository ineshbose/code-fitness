import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './dist/ext',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/webview/main.ts'),
      name: 'code-fitness',
      formats: ['umd'],
    },
    sourcemap: 'inline',
  },
  plugins: [svelte()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
});
