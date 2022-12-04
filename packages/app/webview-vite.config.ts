import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../extension/dist/app',
    emptyOutDir: true,
    lib: {
      entry: './src/main.ts',
      formats: ['es'],
    },
    sourcemap: 'inline',
  },
  plugins: [svelte()],
});
