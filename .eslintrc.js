module.exports = {
  extends: ['@voiceflow/eslint-config', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'jquery'],
  rules: {
    'no-bitwise': 'off',
    'no-continue': 'off',
    'no-process-env': 'off',
    'class-methods-use-this': 'off', // migrating away from classes anyways
    'require-jsdoc': 'off', // not sure we want this
    quotes: ['error', 'single', 'avoid-escape'],
    'valid-jsdoc': 'off',
    'func-names': 'off',
    'import/extensions': 'off',
    // disabled temporarily by setting as warnings
    'eslint-comments/disable-enable-pair': 'warn',
    'eslint-comments/no-unlimited-disable': 'warn',
    'promise/always-return': 'warn',
    'promise/param-names': 'warn',
    'sonarjs/cognitive-complexity': 'warn',
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/no-identical-functions': 'warn',
    'sonarjs/no-useless-catch': 'warn',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/prefer-object-literal': 'warn',
    'consistent-return': 'warn',
    'global-require': 'warn',
    'simple-import-sort/sort': 'error',
    'max-depth': ['error', 6],
    'no-console': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
  },
  env: {
    jquery: true,
    browser: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'import/no-unresolved': 'off',
        'import/export': 'off',
        'valid-jsdoc': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};
