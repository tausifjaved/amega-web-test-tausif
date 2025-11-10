/**
 * Scroll-related helper utilities
 * Provides reusable functions for scroll operations and position checking
 */

/**
 * Get current scroll position
 * @returns {Cypress.Chainable<number>} Current scroll Y position
 */
const getScrollPosition = () => {
  return cy.window().then((win) => {
    return win.scrollY || win.pageYOffset || 0
  })
}

/**
 * Check if page has scrolled
 * @param {number} initialPosition - Initial scroll position
 * @returns {Cypress.Chainable<boolean>} True if page has scrolled
 */
const hasScrolled = (initialPosition) => {
  return getScrollPosition().then((currentPosition) => {
    return currentPosition !== initialPosition
  })
}

/**
 * Scroll to element and wait for animation
 * @param {string} selector - Element selector
 * @param {number} waitTime - Time to wait after scroll (default: 500ms)
 */
const scrollToElement = (selector, waitTime = 500) => {
  cy.get(selector).scrollIntoView({ duration: 500 })
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(waitTime)
}

/**
 * Scroll to position and wait
 * @param {string|number} position - Scroll position ('top', 'bottom', or number)
 * @param {number} waitTime - Time to wait after scroll (default: 1000ms)
 */
const scrollToPosition = (position, waitTime = 1000) => {
  cy.scrollTo(position, { duration: 1000 })
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(waitTime)
}

/**
 * Verify scroll occurred after action
 * @param {Function} action - Action to perform (e.g., click)
 * @param {number} waitTime - Time to wait after action (default: 2000ms)
 */
const verifyScrollAfterAction = (action, waitTime = 2000) => {
  getScrollPosition().then((initialPosition) => {
    action()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(waitTime)
    getScrollPosition().then((finalPosition) => {
      expect(finalPosition).to.not.equal(initialPosition)
    })
  })
}

module.exports = {
  getScrollPosition,
  hasScrolled,
  scrollToElement,
  scrollToPosition,
  verifyScrollAfterAction
}

