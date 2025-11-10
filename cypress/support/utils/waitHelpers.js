/**
 * Wait-related helper utilities
 * Provides reusable functions for waiting operations
 */

/**
 * Wait for page to be fully loaded
 * @param {number} additionalWait - Additional wait time in ms (default: 2000ms)
 */
const waitForPageLoad = (additionalWait = 2000) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(additionalWait)
  cy.window().then((win) => {
    if (win.document && win.document.readyState) {
      // Page is loading or loaded
    }
  })
}

/**
 * Wait for element to be visible
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in ms (default: 10000ms)
 */
const waitForElement = (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible')
}

/**
 * Wait for text to appear
 * @param {string} text - Text to wait for
 * @param {number} timeout - Timeout in ms (default: 10000ms)
 */
const waitForText = (text, timeout = 10000) => {
  cy.contains(text, { timeout }).should('be.visible')
}

/**
 * Wait for navigation to complete
 * @param {number} waitTime - Time to wait in ms (default: 2000ms)
 */
const waitForNavigation = (waitTime = 2000) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(waitTime)
}

/**
 * Wait for animation to complete
 * @param {number} waitTime - Time to wait in ms (default: 500ms)
 */
const waitForAnimation = (waitTime = 500) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(waitTime)
}

module.exports = {
  waitForPageLoad,
  waitForElement,
  waitForText,
  waitForNavigation,
  waitForAnimation
}

