module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'global-require': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
