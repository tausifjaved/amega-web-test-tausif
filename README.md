# Fundix Landing Page - Cypress Test Suite

Automated end-to-end test suite for the Fundix landing page using Cypress.

## Screenshot

![Cypress Test Runner](screenshots/cypress-test-runner.png)

*Cypress test runner showing all tests passing for the Fundix landing page*

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm run cypress:run

# Open Cypress Test Runner
npm run cypress:open
```

## Project Structure

- **Page Object Model**: `cypress/e2e/page-objects/LandingPage.js`
- **Utilities**: `cypress/support/utils/` - Reusable helper functions
- **Constants**: `cypress/support/constants.js` - Test configuration
- **Custom Commands**: `cypress/support/commands.js` - Cypress command extensions

## Test Coverage

- Navigation (header & footer links)
- Content verification
- Interactive elements (buttons, forms, cookie banner)
- Visual elements & responsive design
- Link accessibility & functionality
- Edge cases & error handling

## Available Scripts

- `npm run cypress:open` - Open Cypress Test Runner
- `npm run cypress:run` - Run all tests in headless mode
- `npm run test:chrome` - Run tests in Chrome
- `npm run lint` - Run ESLint

## Tech Stack

- Cypress 13.6.0
- ESLint with Cypress plugin

