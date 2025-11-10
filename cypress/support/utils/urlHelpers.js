/**
 * URL-related helper utilities
 * Provides reusable functions for URL validation and navigation checks
 */

/**
 * Verify URL includes expected path
 * @param {string} expectedPath - Expected path to be included in URL
 * @param {boolean} exactMatch - If true, requires exact match (default: false)
 */
const verifyUrlIncludes = (expectedPath, exactMatch = false) => {
  if (exactMatch) {
    cy.url().should('eq', expectedPath)
  } else {
    cy.url().should('include', expectedPath)
  }
}

/**
 * Verify URL satisfies condition
 * @param {Function} condition - Function that returns boolean
 */
const verifyUrlSatisfies = (condition) => {
  cy.url().should('satisfy', condition)
}

/**
 * Verify URL is on domain
 * @param {string} domain - Domain name (e.g., 'fundix.pro')
 */
const verifyUrlOnDomain = (domain) => {
  cy.url().should('satisfy', (url) => url.includes(domain))
}

/**
 * Get current URL
 * @returns {Cypress.Chainable<string>} Current URL
 */
const getCurrentUrl = () => {
  return cy.url()
}

module.exports = {
  verifyUrlIncludes,
  verifyUrlSatisfies,
  verifyUrlOnDomain,
  getCurrentUrl
}

