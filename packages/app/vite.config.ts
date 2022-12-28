import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  ...(mode === 'webview' ? {} : {}),
}));
