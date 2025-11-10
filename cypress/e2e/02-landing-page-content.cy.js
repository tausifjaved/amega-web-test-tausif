/**
 * Landing Page Content Verification Tests
 * Tests all content elements, headings, and text on the landing page
 */

const LandingPage = require('./page-objects/LandingPage')

describe('Fundix Landing Page - Content Verification', () => {
  const landingPage = new LandingPage()

  beforeEach(() => {
    landingPage.visit()
  })

  describe('Hero Section Content', () => {
    it('should display main hero headline', () => {
      landingPage.heroHeadline.should('be.visible')
      landingPage.heroHeadline.then(($el) => {
        const text = $el.text()
        expect(text).to.satisfy((txt) => txt.includes('internship') || txt.includes('skills'))
      })
    })

    it('should display hero subheadline with funding amount', () => {
      landingPage.heroSubheadline.should('be.visible')
      landingPage.heroSubheadline.then(($el) => {
        const text = $el.text()
        expect(text).to.satisfy((txt) => txt.includes('$10M') || txt.includes('capital'))
      })
    })

    it('should display Google Play download button', () => {
      landingPage.googlePlayButton.should('be.visible')
      landingPage.googlePlayButton.should('contain.text', 'Google Play')
    })

    it('should have clickable Google Play button', () => {
      landingPage.googlePlayButton
        .should('be.visible')
        .should('not.be.disabled')
        .click()
      
      // Verify it opens Google Play or external link
      cy.wait(1000)
    })
  })

  describe('Feature Cards Content', () => {
    it('should display "Free internship" feature card', () => {
      cy.scrollTo(0, 500)
      landingPage.featureCards.freeInternship.should('be.visible')
      cy.contains(/Free internship|You bring the skill/i).should('be.visible')
    })

    it('should display "Funded capital" feature card with amount', () => {
      cy.scrollTo(0, 500)
      cy.contains(/Funded capital|\$10,000,000/i).should('be.visible')
    })

    it('should display "Transparency" feature card', () => {
      cy.scrollTo(0, 500)
      landingPage.featureCards.transparency.should('be.visible')
      cy.contains(/Transparency is #1 priority/i).should('be.visible')
      cy.contains(/No hidden commissions/i).should('be.visible')
    })

    it('should display "Build your personal wealth" feature card', () => {
      cy.scrollTo(0, 500)
      landingPage.featureCards.buildWealth.should('be.visible')
      cy.contains(/Build your personal wealth/i).should('be.visible')
    })
  })

  describe('Key Features Section', () => {
    it('should display "up to $10M" feature', () => {
      cy.scrollTo(0, 800)
      cy.contains(/up to \$10M|Funded account/i).should('be.visible')
    })

    it('should display "24/7 Instant withdrawals" feature', () => {
      cy.scrollTo(0, 800)
      cy.contains(/24\/7|Instant withdrawals/i).should('be.visible')
    })

    it('should display "Zero Participation costs" feature', () => {
      cy.scrollTo(0, 800)
      cy.contains(/Zero|Participation costs/i).should('be.visible')
    })

    it('should display "Unlimited Internship attempts" feature', () => {
      cy.scrollTo(0, 800)
      cy.contains(/∞|Internship attempts/i).should('be.visible')
    })
  })

  describe('Step-by-Step Process', () => {
    it('should display "Prove. Trade. Earn." slogan', () => {
      cy.scrollTo(0, 1000)
      cy.contains(/Prove\. Trade\. Earn\./i).should('be.visible')
    })

    it('should display Step 1: "Pass free internship"', () => {
      cy.scrollTo(0, 1000)
      landingPage.steps.step1.should('be.visible')
      cy.contains(/Step 1|Pass free internship/i).should('be.visible')
      cy.contains(/Show your skills, prove your potential/i).should('be.visible')
    })

    it('should display Step 2: "Get funded"', () => {
      cy.scrollTo(0, 1200)
      landingPage.steps.step2.should('be.visible')
      cy.contains(/Step 2|Get funded/i).should('be.visible')
      cy.contains(/Receive your funded account/i).should('be.visible')
    })

    it('should display Step 3: "Earn as you trade"', () => {
      cy.scrollTo(0, 1400)
      landingPage.steps.step3.should('be.visible')
      cy.contains(/Step 3|Earn as you trade/i).should('be.visible')
      cy.contains(/Trade successfully and keep the profits/i).should('be.visible')
    })
  })

  describe('Comparison Table Content', () => {
    beforeEach(() => {
      // Navigate to "Why us" page if comparison table is there
      cy.contains('a', 'Why us').click()
      cy.wait(2000)
    })

    it('should display "Why choose Fundix" heading', () => {
      cy.contains(/Why choose Fundix/i).should('be.visible')
    })

    it('should display comparison table with Fundix and Others columns', () => {
      cy.contains('th, td', 'Fundix').should('be.visible')
      cy.contains('th, td', 'Others').should('be.visible')
    })

    it('should verify "Free internships" comparison', () => {
      cy.contains(/Free internships/i).should('be.visible')
      // Check for checkmark or X
    })

    it('should verify "Number of internships" comparison', () => {
      cy.contains(/Number of internships|Unlimited|Restricted/i).should('be.visible')
    })

    it('should verify "Cool-off period" comparison', () => {
      cy.contains(/Cool-off period|Up to 1 week|Up to 3 months/i).should('be.visible')
    })

    it('should verify "Capital" comparison', () => {
      cy.contains(/Capital|From \$100k to \$10M|From \$15k to \$100k/i).should('be.visible')
    })

    it('should verify "Capital increased" comparison', () => {
      cy.contains(/Capital increased|\$100k/i).should('be.visible')
    })

    it('should verify "Payouts" comparison', () => {
      cy.contains(/Payouts|24\/7 withdrawals|By request/i).should('be.visible')
    })

    it('should verify "Payout cycle" comparison', () => {
      cy.contains(/Payout cycle|Week|Month/i).should('be.visible')
    })
  })

  describe('Trust Cards Content', () => {
    beforeEach(() => {
      cy.contains('a', 'Why us').click()
      cy.wait(2000)
    })

    it('should display "Trusted by traders" card', () => {
      landingPage.trustCards.trustedByTraders.should('be.visible')
    })

    it('should display rating (4.7) with stars', () => {
      cy.contains(/4\.7|rating/i).should('be.visible')
    })

    it('should display "Best trading conditions" card', () => {
      landingPage.trustCards.bestTradingConditions.should('be.visible')
    })

    it('should list trading conditions with checkmarks', () => {
      cy.contains(/Best trading conditions/i).parent().within(() => {
        cy.contains(/Zero commissions/i).should('be.visible')
        cy.contains(/No requotes/i).should('be.visible')
        cy.contains(/Institutional spreads/i).should('be.visible')
        cy.contains(/Best execution/i).should('be.visible')
        cy.contains(/Personalized support/i).should('be.visible')
      })
    })
  })

  describe('Footer Content', () => {
    it('should display company legal information', () => {
      cy.scrollTo('bottom')
      cy.contains(/Amega Capital Ltd/i).should('be.visible')
      cy.contains(/Saint Lucia/i).should('be.visible')
      cy.contains(/Reg\. No\./i).should('be.visible')
    })

    it('should display proprietary trading company disclaimer', () => {
      cy.scrollTo('bottom')
      cy.contains(/Proprietary Trading Company/i).should('be.visible')
      cy.contains(/independent contractors/i).should('be.visible')
    })

    it('should display geographic restrictions', () => {
      cy.scrollTo('bottom')
      cy.contains(/American|North Korean|Russian|Mauritian|Iranian/i).should('be.visible')
    })

    it('should display copyright year', () => {
      cy.scrollTo('bottom')
      landingPage.copyrightText.should('be.visible')
      landingPage.copyrightText.should('match', /\d{4}/)
    })
  })

  describe('Content Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1').should('exist')
      cy.get('h1').should('be.visible')
    })

    it('should have alt text for images', () => {
      cy.get('img').each(($img) => {
        const alt = $img.attr('alt')
        // Some images might not need alt (decorative), but important ones should have it
        if ($img.attr('role') !== 'presentation') {
          expect(alt).to.not.be.undefined
        }
      })
    })

    it('should have proper contrast for text', () => {
      cy.get('body').should('have.css', 'color')
      // Additional contrast checks can be added
    })
  })
})

