// eslint.config.cjs
const { FlatCompat } = require('@eslint/eslintrc');

const tsParser = require('@typescript-eslint/parser');
const tseslint = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-plugin-prettier');
const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  // 1) 무시 경로
  { ignores: ['.next/**', 'node_modules/**'] },
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),

  // 프로젝트 공통 규칙 주입
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      import: importPlugin,
      prettier,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: true, node: true },
    },
    rules: {
      /* --- 에러 --- */
      'no-empty': ['error', { allowEmptyCatch: true }],
      'import/no-duplicates': 'error',

      /* --- 경고 --- */
      'import/order': ['off'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],

      /* --- 잠시 off --- */
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/export': 'off',

      /* --- Prettier를 경고로 --- */
      'prettier/prettier': [
        'warn',
        { singleQuote: true, trailingComma: 'all', printWidth: 100 },
      ],

      /* --- React 19 --- */
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
];
