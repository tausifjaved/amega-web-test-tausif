/**
 * Test constants and configuration
 * Centralized location for test data, selectors, and configuration values
 */

// Base URLs
const BASE_URL = 'https://fundix.pro/'
const DOMAIN = 'fundix.pro'

// Timeouts (in milliseconds)
const TIMEOUTS = {
  SHORT: 1000,
  MEDIUM: 2000,
  LONG: 5000,
  ELEMENT: 10000,
  NAVIGATION: 15000,
  PAGE_LOAD: 2000
}

// Navigation links
const NAVIGATION_LINKS = {
  HOW_IT_WORKS: 'How it works',
  WHY_US: 'Why us',
  PRO_TRADERS: 'Pro traders',
  FAQ: 'FAQ',
  BLOG: 'Blog',
  LEGAL_DOCUMENTS: 'Legal documents',
  GET_FUNDED: 'Get funded'
}

// Text content patterns
const TEXT_PATTERNS = {
  HERO_HEADLINE: /Join our free internship|Your skills, our capital/i,
  HERO_SUBHEADLINE: /Unlock up to \$10M|Let's grow together/i,
  FREE_INTERNSHIP: /Free internship|You bring the skill/i,
  FUNDED_CAPITAL: /Funded capital|\$10,000,000/i,
  TRANSPARENCY: /Transparency is #1 priority/i,
  BUILD_WEALTH: /Build your personal wealth/i,
  UP_TO_10M: /up to \$10M|Funded account/i,
  INSTANT_WITHDRAWALS: /24\/7|Instant withdrawals/i,
  ZERO_COSTS: /Zero|Participation costs/i,
  UNLIMITED_ATTEMPTS: /∞|Internship attempts/i,
  COOKIE_BANNER: /We use cookies/i,
  COPYRIGHT: /©.*All Rights Reserved|Copyright/i
}

// Viewport sizes
const VIEWPORTS = {
  DESKTOP: { width: 1920, height: 1080 },
  TABLET: { width: 768, height: 1024 },
  MOBILE: { width: 375, height: 667 }
}

// Company information
const COMPANY_INFO = {
  NAME: 'Amega Capital Ltd',
  LOCATION: 'Saint Lucia',
  DOMAIN: 'fundix.pro'
}

// Feature cards
const FEATURE_CARDS = {
  FREE_INTERNSHIP: 'Free internship',
  FUNDED_CAPITAL: 'Funded capital',
  TRANSPARENCY: 'Transparency',
  BUILD_WEALTH: 'Build your personal wealth'
}

// Steps
const STEPS = {
  STEP_1: 'Step 1',
  STEP_2: 'Step 2',
  STEP_3: 'Step 3'
}

module.exports = {
  BASE_URL,
  DOMAIN,
  TIMEOUTS,
  NAVIGATION_LINKS,
  TEXT_PATTERNS,
  VIEWPORTS,
  COMPANY_INFO,
  FEATURE_CARDS,
  STEPS
}

