/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-config/nextjs.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  }
};
