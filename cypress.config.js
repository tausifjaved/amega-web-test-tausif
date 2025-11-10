const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://fundix.pro',
    viewportWidth: 1920,
    viewportHeight: 1080,
    // Increased timeouts to make tests more lenient
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    // Retry failed tests
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: '*.hot-update.js',
    experimentalStudio: true,
  },
  env: {
    // Add environment variables here if needed
  }
})

