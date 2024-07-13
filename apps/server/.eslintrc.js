const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo'
  ].map(require.resolve),
  parserOptions: {
    project
  },
  globals: {
    React: true,
    JSX: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      },
      node: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx']
      }
    },
    'import/ignore': ['node_modules', '@prisma/client']
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    semi: ['error', 'always'],
    'no-duplicate-imports': ['error', { includeExports: true }],
    complexity: ['error', 10],
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    'require-await': 'off',
    '@typescript-eslint/require-await': ['error'],
    'no-nested-ternary': 'error',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],
    'import/extensions': ['warn', 'never'],
    'react/jsx-sort-props': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'unicorn/filename-case': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false
        }
      }
    ]
  }
};
