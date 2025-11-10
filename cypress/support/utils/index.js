/**
 * Utility functions index
 * Central export point for all utility functions
 */

// Scroll helpers
const scrollHelpers = require('./scrollHelpers')

// URL helpers
const urlHelpers = require('./urlHelpers')

// Wait helpers
const waitHelpers = require('./waitHelpers')

// Element helpers
const elementHelpers = require('./elementHelpers')

// Cookie helpers
const cookieHelpers = require('./cookieHelpers')

// Export all utilities
module.exports = {
  ...scrollHelpers,
  ...urlHelpers,
  ...waitHelpers,
  ...elementHelpers,
  ...cookieHelpers
}

