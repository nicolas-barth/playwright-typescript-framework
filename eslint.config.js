const tsPlugin = require(`@typescript-eslint/eslint-plugin`);
const tsParser = require(`@typescript-eslint/parser`);

module.exports = [
  {
    ignores: [
      `allure-results/**`,
      `html-report/**`,
      `logs/**`,
      `node_modules/**`,
      `playwright-report/**`,
      `test-results/**`,
      `tests/ui/har/*.har`,
      `tests/ui/har/*.dat`,
      `tests/ui/har/*.html`,
      `tests/ui/har/*.css`,
      `tests/ui/har/*.jpeg`,
      `tests/ui/har/[0-9a-f]*.js`,
    ],
  },
  {
    files: [`**/*.ts`],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: `module`,
        project: `./tsconfig.json`,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': `warn`,
      '@typescript-eslint/no-unused-vars': [`error`, { argsIgnorePattern: `^_` }],
      '@typescript-eslint/no-floating-promises': `error`,
      '@typescript-eslint/no-misused-promises': `error`,
      'no-duplicate-imports': `error`,
    },
  },
  {
    files: [`**/*.js`],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: `commonjs`,
      globals: {
        require: `readonly`,
        module: `readonly`,
        process: `readonly`,
        console: `readonly`,
        __dirname: `readonly`,
      },
    },
  },
];
