const eslintPluginCypress = require('eslint-plugin-cypress');
const globals = require('globals');

module.exports = [
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly'
      }
    },
    plugins: {
      cypress: eslintPluginCypress
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'cypress/no-assigning-return-values': 'warn',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/require-data-selectors': 'off'
    }
  }
];

