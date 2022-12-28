import type { Linter } from 'eslint';
import svelte from './svelte';

export = <Linter.Config>{
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    ...(<string[]>svelte.extends || []),
  ],
  ignorePatterns: [
    '.turbo',
    'dist',
    'node_modules',
    ...(<string[]>svelte.ignorePatterns || []),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [...(svelte.overrides || [])],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'global-require': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
