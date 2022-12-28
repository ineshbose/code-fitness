import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/**
 * Consult https://github.com/sveltejs/svelte-preprocess
 * for more information about preprocessors
 *
 * @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess(),
  kit: { adapter: adapter({ fallback: 'index.html' }) },
};
