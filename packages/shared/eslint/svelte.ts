import type { Linter } from 'eslint';

export default <Linter.Config>{
  extends: ['plugin:svelte/recommended'],
  ignorePatterns: ['build', '.svelte-kit'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: { ts: '@typescript-eslint/parser' },
      },
      rules: {
        'no-undef': 'off',
        'import/prefer-default-export': 'off',
        'import/no-mutable-exports': 'off',
      },
    },
  ],
};
