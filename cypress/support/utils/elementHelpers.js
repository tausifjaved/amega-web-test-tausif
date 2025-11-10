/**
 * Element-related helper utilities
 * Provides reusable functions for element operations and checks
 */

/**
 * Check if element exists in body
 * @param {string} selector - Element selector
 * @returns {Cypress.Chainable<boolean>} True if element exists
 */
const elementExists = (selector) => {
  return cy.get('body').then(($body) => {
    return $body.find(selector).length > 0
  })
}

/**
 * Check if text exists in body
 * @param {string} text - Text to search for
 * @returns {Cypress.Chainable<boolean>} True if text exists
 */
const textExists = (text) => {
  return cy.get('body').then(($body) => {
    return $body.text().includes(text)
  })
}

/**
 * Verify element is visible with timeout
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in ms (default: 15000ms)
 */
const verifyElementVisible = (selector, timeout = 15000) => {
  cy.get(selector, { timeout }).should('be.visible')
}

/**
 * Verify text is visible with timeout
 * @param {string} text - Text to verify
 * @param {number} timeout - Timeout in ms (default: 15000ms)
 */
const verifyTextVisible = (text, timeout = 15000) => {
  cy.contains(text, { timeout }).should('be.visible')
}

/**
 * Click element with force if needed
 * @param {string} selector - Element selector
 * @param {boolean} force - Force click (default: true)
 */
const clickElement = (selector, force = true) => {
  // eslint-disable-next-line cypress/no-force
  cy.get(selector).click({ force })
}

/**
 * Click text with force if needed
 * @param {string} text - Text to click
 * @param {string} elementType - Element type (default: 'a')
 * @param {boolean} force - Force click (default: true)
 */
const clickText = (text, elementType = 'a', force = true) => {
  // eslint-disable-next-line cypress/no-force
  cy.contains(elementType, text).click({ force })
}

/**
 * Get element count
 * @param {string} selector - Element selector
 * @returns {Cypress.Chainable<number>} Number of elements found
 */
const getElementCount = (selector) => {
  return cy.get(selector).then(($elements) => {
    return $elements.length
  })
}

module.exports = {
  elementExists,
  textExists,
  verifyElementVisible,
  verifyTextVisible,
  clickElement,
  clickText,
  getElementCount
}

