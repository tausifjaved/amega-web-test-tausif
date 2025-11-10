/**
 * Page Object Model for Fundix Landing Page
 * This class contains all selectors and helper methods for the landing page
 */

class LandingPage {
  // Header selectors
  get logo() {
    // Find logo by text "Fundix" - most reliable method
    return cy.contains('a, [class*="logo"]', 'Fundix', { timeout: 10000 }).first()
  }

  get navigationLinks() {
    return {
      howItWorks: cy.contains('a', 'How it works', { timeout: 10000 }),
      whyUs: cy.contains('a', 'Why us', { timeout: 10000 }),
      proTraders: cy.contains('a', 'Pro traders', { timeout: 10000 }),
      faq: cy.contains('a', 'FAQ', { timeout: 10000 }),
      blog: cy.contains('a', 'Blog', { timeout: 10000 }),
      legalDocuments: cy.contains('a', 'Legal documents', { timeout: 10000 })
    }
  }

  get getFundedButton() {
    return cy.contains('button, a', 'Get funded', { timeout: 10000 })
  }

  // Hero section selectors
  get heroHeadline() {
    return cy.contains(/Join our free internship|Your skills, our capital/i)
  }

  get heroSubheadline() {
    return cy.contains(/Unlock up to \$10M|Let's grow together/i)
  }

  get googlePlayButton() {
    return cy.contains('button, a', /GET IT ON Google Play|Google Play/i)
  }

  // Feature cards selectors
  get featureCards() {
    return {
      freeInternship: cy.contains(/Free internship|You bring the skill/i),
      fundedCapital: cy.contains(/Funded capital|\$10,000,000/i),
      transparency: cy.contains(/Transparency is #1 priority/i),
      buildWealth: cy.contains(/Build your personal wealth/i)
    }
  }

  // Key features section
  get keyFeatures() {
    return {
      upTo10M: cy.contains(/up to \$10M|Funded account/i),
      instantWithdrawals: cy.contains(/24\/7|Instant withdrawals/i),
      zeroCosts: cy.contains(/Zero|Participation costs/i),
      unlimitedAttempts: cy.contains(/∞|Internship attempts/i)
    }
  }

  // Step-by-step process
  get steps() {
    return {
      step1: cy.contains(/Step 1|Pass free internship/i),
      step2: cy.contains(/Step 2|Get funded/i),
      step3: cy.contains(/Step 3|Earn as you trade/i)
    }
  }

  // Comparison table selectors
  get comparisonTable() {
    return {
      table: cy.contains(/Why choose Fundix/i).parent(),
      fundixColumn: cy.contains('th, td', 'Fundix'),
      othersColumn: cy.contains('th, td', 'Others'),
      checkmarks: cy.get('[class*="check"], svg[class*="check"], [aria-label*="check"]'),
      crosses: cy.get('[class*="cross"], svg[class*="cross"], [aria-label*="cross"]')
    }
  }

  // Trust cards
  get trustCards() {
    return {
      trustedByTraders: cy.contains(/Trusted by traders/i),
      bestTradingConditions: cy.contains(/Best trading conditions/i),
      rating: cy.contains(/4\.7|rating/i)
    }
  }

  // Cookie consent banner
  get cookieBanner() {
    return cy.contains(/We use cookies/i).parent()
  }

  get cookieAcceptButton() {
    return cy.contains('button', /Okay|Accept|Got it/i)
  }

  // Footer selectors
  get footer() {
    return cy.get('footer, [class*="footer"]')
  }

  get footerLinks() {
    return this.footer.find('a')
  }

  get copyrightText() {
    return cy.contains(/©.*All Rights Reserved|Copyright/i)
  }

  // Methods
  visit() {
    cy.visit('/')
    cy.waitForPageLoad()
    // Dismiss cookie banner if present (non-blocking)
    this.dismissCookieBannerIfPresent()
  }

  dismissCookieBannerIfPresent() {
    // Use utility function for cookie banner dismissal
    const { dismissCookieBannerIfPresent: dismissCookie } = require('../../support/utils/cookieHelpers')
    dismissCookie()
  }

  verifyHeaderElements() {
    this.logo.should('be.visible')
    this.navigationLinks.howItWorks.should('be.visible')
    this.navigationLinks.whyUs.should('be.visible')
    this.navigationLinks.proTraders.should('be.visible')
    this.navigationLinks.faq.should('be.visible')
    this.navigationLinks.blog.should('be.visible')
    this.getFundedButton.should('be.visible')
  }

  verifyHeroSection() {
    this.heroHeadline.should('be.visible')
    this.heroSubheadline.should('be.visible')
  }

  clickNavigationLink(linkName) {
    this.navigationLinks[linkName].click()
  }

  clickGetFundedButton() {
    this.getFundedButton.first().click()
  }
}

module.exports = LandingPage

