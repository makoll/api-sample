module.exports = {
  root: true,
  ignorePatterns: ['!.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'sort-destructure-keys'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-restricted-imports': ['error', { patterns: ['./', '../'] }],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': 2,
  },
  settings: {
    'import/internal-regex': '^@',
  },
};
