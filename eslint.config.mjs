import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintPrettier from 'eslint-plugin-prettier';
import eslintPrettierConfig from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';

const tsConfigPath = './tsconfig.json';

export default [
  eslintJs.configs.recommended,
  eslintImport.flatConfigs.recommended,
  eslintImport.flatConfigs.typescript,
  ...eslintTs.configs.recommended,
  ...eslintTs.configs.stylistic,
  {
    languageOptions: {
      parserOptions: {
        tsConfigPath,
        ecmaVersion: 2020,
        browser: true,
        node: true,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          tsConfigPath,
        },
      },
    },
    plugins: {
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      prettier: eslintPrettier,
    },
    rules: {
      ...eslintReactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['dist', 'node_modules', 'vite.config.mts'],
  },
  eslintPrettierConfig, // Должен быть в конце, чтобы отключить конфликтующие правила
];
