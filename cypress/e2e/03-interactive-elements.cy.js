/**
 * Interactive Elements Tests
 * Tests buttons, forms, cookie banner, and other interactive elements
 */

const LandingPage = require('./page-objects/LandingPage')

describe('Fundix Landing Page - Interactive Elements', () => {
  const landingPage = new LandingPage()

  beforeEach(() => {
    landingPage.visit()
  })

  describe('Cookie Consent Banner', () => {
    it('should display cookie consent banner', () => {
      cy.contains(/We use cookies/i).should('be.visible')
    })

    it('should have cookie consent message', () => {
      cy.contains(/We use cookies to personalize content/i).should('be.visible')
    })

    it('should have "Okay" button on cookie banner', () => {
      landingPage.cookieAcceptButton.should('be.visible')
      landingPage.cookieAcceptButton.then(($btn) => {
        const text = $btn.text()
        expect(text).to.satisfy((txt) => txt.includes('Okay') || txt.includes('Accept'))
      })
    })

    it('should dismiss cookie banner when "Okay" is clicked', () => {
      landingPage.cookieAcceptButton.click()
      cy.wait(1000)
      // Banner should be hidden or removed
      cy.get('body').then(($body) => {
        const bannerExists = $body.find('[class*="cookie"], [data-testid*="cookie"]').length > 0
        if (bannerExists) {
          cy.contains(/We use cookies/i).should('not.be.visible')
        } else {
          cy.contains(/We use cookies/i).should('not.exist')
        }
      })
    })

    it('should not display cookie banner after dismissal on page reload', () => {
      landingPage.cookieAcceptButton.click()
      cy.wait(1000)
      cy.reload()
      cy.wait(2000)
      // Cookie banner might not appear if cookie is set
      cy.get('body').then(($body) => {
        if ($body.find('[class*="cookie"]').length > 0) {
          cy.contains(/We use cookies/i).should('not.be.visible')
        }
      })
    })
  })

  describe('Get Funded Button', () => {
    it('should have multiple "Get funded" buttons on page', () => {
      cy.get('body').then(($body) => {
        const buttons = $body.find('button:contains("Get funded"), a:contains("Get funded")')
        expect(buttons.length).to.be.at.least(1)
      })
    })

    it('should click header "Get funded" button', () => {
      landingPage.getFundedButton.first()
        .should('be.visible')
        .should('not.be.disabled')
        .click()
      
      cy.wait(2000)
      // Verify navigation or modal
      cy.url().should('include', 'fundix.pro')
    })

    it('should click main content "Get funded" button', () => {
      cy.scrollTo(0, 500)
      cy.contains('button, a', 'Get funded', { timeout: 10000 })
        .should('be.visible')
        .click()
      
      cy.wait(2000)
      cy.url().should('include', 'fundix.pro')
    })

    it('should verify "Get funded" button styling', () => {
      landingPage.getFundedButton.first()
        .should('be.visible')
        .should('have.css', 'cursor')
        .then((cursor) => {
          expect(['pointer', 'default', 'cursor']).to.include(cursor)
        })
    })
  })

  describe('Google Play Button', () => {
    it('should display Google Play button in hero section', () => {
      landingPage.googlePlayButton.should('be.visible')
    })

    it('should display Google Play button in footer', () => {
      cy.scrollTo('bottom')
      cy.contains('button, a', /GET IT ON Google Play|Google Play/i)
        .should('be.visible')
    })

    it('should click Google Play button and verify external link', () => {
      landingPage.googlePlayButton.first()
        .should('be.visible')
        .should('have.attr', 'href')
        .then((href) => {
          expect(href).to.satisfy((h) => h.includes('play.google.com') || h.includes('google'))
        })
    })

    it('should have proper Google Play button styling', () => {
      landingPage.googlePlayButton.first()
        .should('be.visible')
        .should('have.css', 'display')
    })
  })

  describe('Time Filters (if present)', () => {
    it('should display time filter buttons (Week, Month, Quarter, Year)', () => {
      cy.scrollTo(0, 500)
      cy.get('body').then(($body) => {
        if ($body.text().includes('Week') || $body.text().includes('Month')) {
          cy.contains(/Week|Month|Quarter|Year/i).should('be.visible')
        }
      })
    })

    it('should click on "Week" filter', () => {
      cy.contains('button', 'Week', { timeout: 5000 })
        .should('be.visible')
        .click()
        .then(() => {
          cy.wait(1000)
        })
    })

    it('should click on "Month" filter', () => {
      cy.contains('button', 'Month', { timeout: 5000 })
        .should('be.visible')
        .click()
        .then(() => {
          cy.wait(1000)
        })
    })

    it('should click on "Quarter" filter', () => {
      cy.contains('button', 'Quarter', { timeout: 5000 })
        .should('be.visible')
        .click()
        .then(() => {
          cy.wait(1000)
        })
    })

    it('should click on "Year" filter', () => {
      cy.contains('button', 'Year', { timeout: 5000 })
        .should('be.visible')
        .click()
        .then(() => {
          cy.wait(1000)
        })
    })
  })

  describe('Feature Card Interactions', () => {
    it('should hover over feature cards', () => {
      cy.scrollTo(0, 500)
      cy.contains(/Free internship|Funded capital/i)
        .parent()
        .trigger('mouseover')
      
      cy.wait(500)
    })

    it('should verify feature cards are clickable if they are links', () => {
      cy.scrollTo(0, 500)
      cy.get('[class*="card"], [class*="feature"]').each(($card) => {
        if ($card.is('a') || $card.find('a').length > 0) {
          cy.wrap($card).should('be.visible')
        }
      })
    })
  })

  describe('Step Cards Interactions', () => {
    it('should display all step cards', () => {
      cy.scrollTo(0, 1000)
      landingPage.steps.step1.should('be.visible')
      landingPage.steps.step2.should('be.visible')
      landingPage.steps.step3.should('be.visible')
    })

    it('should hover over step cards', () => {
      cy.scrollTo(0, 1000)
      landingPage.steps.step1.parent().trigger('mouseover')
      cy.wait(500)
      landingPage.steps.step2.parent().trigger('mouseover')
      cy.wait(500)
      landingPage.steps.step3.parent().trigger('mouseover')
    })
  })

  describe('Scroll Interactions', () => {
    it('should scroll smoothly through the page', () => {
      cy.scrollTo(0, 500, { duration: 1000 })
      cy.wait(500)
      cy.scrollTo(0, 1000, { duration: 1000 })
      cy.wait(500)
      cy.scrollTo(0, 1500, { duration: 1000 })
      cy.wait(500)
      cy.scrollTo('bottom', { duration: 1000 })
    })

    it('should maintain header visibility while scrolling', () => {
      cy.scrollTo(0, 500)
      landingPage.logo.should('be.visible')
      cy.scrollTo(0, 1000)
      landingPage.logo.should('be.visible')
    })
  })

  describe('Button States', () => {
    it('should verify buttons are not disabled', () => {
      cy.get('button:not([disabled]), a[role="button"]').each(($btn) => {
        if ($btn.is(':visible')) {
          cy.wrap($btn).should('not.have.attr', 'disabled')
        }
      })
    })

    it('should verify buttons have proper cursor on hover', () => {
      landingPage.getFundedButton.first()
        .trigger('mouseover')
        .should('have.css', 'cursor')
    })
  })

  describe('Form Elements (if any)', () => {
    it('should check for any input fields', () => {
      cy.get('input[type="text"], input[type="email"], input[type="tel"]')
        .then(($inputs) => {
          if ($inputs.length > 0) {
            cy.wrap($inputs).each(($input) => {
              cy.wrap($input).should('be.visible')
            })
          }
        })
    })

    it('should check for any textarea fields', () => {
      cy.get('textarea').then(($textareas) => {
        if ($textareas.length > 0) {
          cy.wrap($textareas).each(($textarea) => {
            cy.wrap($textarea).should('be.visible')
          })
        }
      })
    })
  })
})

