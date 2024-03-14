const { FlatCompat } = require('@eslint/eslintrc');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginCheckFile = require('eslint-plugin-check-file');
const eslintPluginImport = require('eslint-plugin-import');
const globals = require('globals');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const defaultConfig = {
  languageOptions: {
    globals: { ...globals.es2020, ...globals.jest, ...globals.node },
  },
  plugins: {
    import: eslintPluginImport,
    'check-file': eslintPluginCheckFile,
  },
};

const tsConfig = {
  ...defaultConfig,
  languageOptions: {
    ...defaultConfig.languageOptions,
    parser: tsParser,
    parserOptions: {
      project: ['tsconfig.json'],
    },
  },
  plugins: {
    ...defaultConfig.plugins,
    '@typescript-eslint': ts,
  },
};

const ignoresFilesAndFolders = {
  ignores: ['**/dist', '**/node_modules', '**/jest.*.ts'],
};

const generalJsLint = {
  ...defaultConfig,
  plugins: {
    ...defaultConfig.plugins,
  },
  files: ['**/*.js'],
  rules: {
    'no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    curly: 'error',
  },
};

const generalTsLint = {
  ...tsConfig,
  files: ['**/*.ts'],
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    curly: 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};

const generalLint = {
  ...tsConfig,
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  rules: {
    'array-callback-return': ['error', { allowImplicit: true }],
    camelcase: ['off', { properties: 'never' }],
    complexity: ['error', { max: 15 }],
    'default-case': ['off'],
    'default-case-last': ['off'],
    'dot-notation': ['error'],
    eqeqeq: 'error',
    'func-style': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc' },
        pathGroups: [
          {
            pattern:
              '{@airbnb/**,@apollo/**,@google-cloud/**,@sentry/**,@testing-library/**,@workos-inc/**}',
            group: 'external',
          },
          {
            pattern: '@fleex/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error', 'time', 'timeEnd'] }],
    'no-dupe-keys': 'error',
    'no-else-return': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-function': 'off',
    'no-implicit-coercion': 'error',
    'no-invalid-this': 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-return': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'arrow-body-style': ['error', 'as-needed'],
  },
};

const backConfig = {
  ...tsConfig,
  files: ['src/**/*.ts'],
  rules: {
    'check-file/folder-naming-convention': [
      'error',
      { 'src/**': 'KEBAB_CASE' },
    ],
  },
};

/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  ...compat.extends(
    'plugin:import/typescript',
    'plugin:typescript-sort-keys/recommended',
  ),
  eslintConfigPrettier,
  backConfig,
  generalLint,
  generalTsLint,
  generalJsLint,
  ignoresFilesAndFolders,
];
