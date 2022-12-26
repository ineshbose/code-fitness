import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  ...(mode === 'webview'
    ? {
        build: {
          outDir: '../extension/dist/app',
          emptyOutDir: true,
          lib: {
            entry: './src/main.ts',
            formats: ['es'],
          },
          sourcemap: 'inline',
          rollupOptions: {
            output: {
              entryFileNames: `[name].js`,
              chunkFileNames: `[name].js`,
              assetFileNames: `assets/[name].[ext]`,
            },
          },
        },
      }
    : {}),
}));
