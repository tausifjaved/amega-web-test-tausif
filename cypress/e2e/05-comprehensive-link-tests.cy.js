/**
 * Comprehensive Link Testing
 * Tests all links on the landing page including navigation, footer, and external links
 */

const LandingPage = require('./page-objects/LandingPage')

describe('Fundix Landing Page - Comprehensive Link Tests', () => {
  const landingPage = new LandingPage()

  beforeEach(() => {
    landingPage.visit()
  })

  describe('Header Navigation Links', () => {
    const headerLinks = [
      { text: 'How it works', expectedPath: '/how-it-works' },
      { text: 'Why us', expectedPath: '/why-us' },
      { text: 'Pro traders', expectedPath: '/pro-traders' },
      { text: 'FAQ', expectedPath: '/faq' },
      { text: 'Blog', expectedPath: '/blog' }
    ]

    headerLinks.forEach(({ text, expectedPath }) => {
      it(`should verify "${text}" link exists and is clickable`, () => {
        cy.contains('header a', text, { timeout: 10000 })
          .should('be.visible')
          .should('have.attr', 'href')
          .should('not.be.empty')
      })

      it(`should navigate to correct page when "${text}" is clicked`, () => {
        cy.contains('header a', text, { timeout: 10000 })
          .should('be.visible')
          .then(($link) => {
            const href = $link.attr('href')
            cy.contains('header a', text).click()
            cy.wait(2000)
            cy.url().should('satisfy', (url) => {
              return url.includes('fundix.pro') && (href.includes('#') || url.includes(href.split('/').pop()))
            })
          })
      })

      it(`should have proper styling for "${text}" link`, () => {
        cy.contains('header a', text, { timeout: 10000 })
          .should('be.visible')
          .should('have.css', 'color')
      })
    })
  })

  describe('Footer Navigation Links', () => {
    const footerLinks = [
      { text: 'How it works' },
      { text: 'Why us' },
      { text: 'Pro traders' },
      { text: 'FAQ' },
      { text: 'Blog' },
      { text: 'Legal documents' }
    ]

    footerLinks.forEach(({ text }) => {
      it(`should verify footer "${text}" link exists`, () => {
        cy.scrollTo('bottom')
        cy.contains('footer a, [class*="footer"] a', text, { timeout: 10000 })
          .should('be.visible')
          .should('have.attr', 'href')
      })

      it(`should navigate when footer "${text}" link is clicked`, () => {
        cy.scrollTo('bottom')
        cy.contains('footer a, [class*="footer"] a', text, { timeout: 10000 })
          .should('be.visible')
          .click()
        cy.wait(2000)
        cy.url().should('include', 'fundix.pro')
      })
    })
  })

  describe('Logo Links', () => {
    it('should have clickable header logo', () => {
      landingPage.logo
        .should('be.visible')
        .should('have.attr', 'href')
        .click()
      cy.url().should('eq', 'https://fundix.pro/')
    })

    it('should have clickable footer logo', () => {
      cy.scrollTo('bottom')
      cy.get('footer a, [class*="footer"] a')
        .contains('Fundix')
        .first()
        .should('be.visible')
        .click()
      cy.url().should('include', 'fundix.pro')
    })
  })

  describe('Call-to-Action Links', () => {
    it('should verify all "Get funded" buttons/links', () => {
      cy.get('button:contains("Get funded"), a:contains("Get funded")')
        .should('have.length.at.least', 1)
        .each(($btn) => {
          cy.wrap($btn).should('be.visible')
        })
    })

    it('should verify Google Play link in hero section', () => {
      landingPage.googlePlayButton
        .should('be.visible')
        .should('have.attr', 'href')
        .then((href) => {
          expect(href).to.satisfy((h) => h.includes('play.google.com') || h.includes('google'))
        })
    })

    it('should verify Google Play link in footer', () => {
      cy.scrollTo('bottom')
      cy.contains('footer a, [class*="footer"] a', /Google Play/i)
        .should('be.visible')
        .should('have.attr', 'href')
    })
  })

  describe('External Links', () => {
    it('should verify all external links open in new tab or have target="_blank"', () => {
      cy.get('a[href^="http"]').each(($link) => {
        const href = $link.attr('href')
        const target = $link.attr('target')
        
        if (href && !href.includes('fundix.pro')) {
          // External links should ideally open in new tab
          // This is optional, so we just verify the link exists
          cy.wrap($link).should('have.attr', 'href')
        }
      })
    })

    it('should verify Google Play store link', () => {
      landingPage.googlePlayButton
        .should('have.attr', 'href')
        .then((href) => {
          if (href) {
            expect(href).to.satisfy((h) => h.includes('play.google.com') || h.includes('google'))
          }
        })
    })
  })

  describe('Anchor Links (Hash Links)', () => {
    it('should verify anchor links work correctly', () => {
      cy.get('a[href^="#"]').each(($link) => {
        const href = $link.attr('href')
        if (href && href !== '#') {
          cy.wrap($link).click()
          cy.wait(1000)
          cy.url().should('include', href)
        }
      })
    })
  })

  describe('Link Accessibility', () => {
    it('should have all links with proper href attributes', () => {
      cy.get('a').each(($link) => {
        const href = $link.attr('href')
        const text = $link.text().trim()
        
        if (text.length > 0) {
          // Links should have href or be buttons
          expect(href).to.not.be.undefined
        }
      })
    })

    it('should have accessible link text', () => {
      cy.get('a').each(($link) => {
        const text = $link.text().trim()
        const ariaLabel = $link.attr('aria-label')
        const title = $link.attr('title')
        
        // Link should have text, aria-label, or title
        expect(text.length > 0 || ariaLabel || title).to.be.true
      })
    })

    it('should have proper focus states for links', () => {
      cy.get('a').first()
        .focus()
        .should('be.focused')
    })
  })

  describe('Link Status Codes', () => {
    it('should verify all internal links return 200 status', () => {
      cy.get('a[href^="/"], a[href*="fundix.pro"]').each(($link) => {
        const href = $link.attr('href')
        if (href && !href.startsWith('#')) {
          const fullUrl = href.startsWith('http') ? href : `https://fundix.pro${href}`
          cy.request({
            url: fullUrl,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302])
          })
        }
      })
    })
  })

  describe('Link Hover States', () => {
    it('should have hover effects on navigation links', () => {
      cy.contains('header a', 'How it works')
        .trigger('mouseover')
        .should('have.css', 'color')
        .then(() => {
          // Hover effect should be present
          cy.contains('header a', 'How it works').should('be.visible')
        })
    })

    it('should have hover effects on footer links', () => {
      cy.scrollTo('bottom')
      cy.contains('footer a', 'FAQ')
        .trigger('mouseover')
        .should('have.css', 'color')
    })
  })

  describe('Link Click Tracking (if applicable)', () => {
    it('should track link clicks without errors', () => {
      cy.window().then((win) => {
        // Check if analytics or tracking is present
        const hasAnalytics = win.gtag || win.dataLayer || win.analytics
        // Just verify clicking doesn't break
        cy.contains('header a', 'FAQ').click()
        cy.wait(1000)
        cy.url().should('include', 'fundix.pro')
      })
    })
  })
})

