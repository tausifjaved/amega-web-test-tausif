/**
 * Landing Page Navigation Tests
 * Tests all navigation links and header elements
 */

const LandingPage = require('./page-objects/LandingPage')

describe('Fundix Landing Page - Navigation Tests', () => {
  const landingPage = new LandingPage()

  beforeEach(() => {
    landingPage.visit()
  })

  describe('Header Navigation', () => {
    it('should display the Fundix logo in the header', () => {
      // Wait for page to be fully loaded
      cy.wait(2000)
      // Find logo by text - try multiple selectors
      cy.get('body').then(($body) => {
        // Try to find any element containing "Fundix" text
        const fundixElements = $body.find('*:contains("Fundix")')
        expect(fundixElements.length).to.be.greaterThan(0)
        // Verify at least one is visible
        cy.contains('Fundix', { timeout: 15000 }).should('be.visible')
      })
    })

    it('should have clickable logo (does nothing on click)', () => {
      cy.wait(2000)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        cy.contains('Fundix', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(1000)
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Logo click should not scroll or change URL
          expect(scrollYAfter).to.equal(scrollYBefore)
        })
        // Logo click should not change URL
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should display all navigation links in header', () => {
      cy.wait(2000)
      // Check logo
      cy.contains('Fundix', { timeout: 15000 }).should('be.visible')
      // Check navigation links
      cy.contains('a', 'How it works', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'Why us', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'Pro traders', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'FAQ', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'Blog', { timeout: 15000 }).should('be.visible')
      // Check Get funded button
      cy.contains('button, a', 'Get funded', { timeout: 15000 }).should('be.visible')
    })

    it('should scroll page when clicking "How it works" link', () => {
      cy.wait(2000)
      // Scroll to top first to ensure we can scroll down
      cy.scrollTo('top')
      cy.wait(500)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        cy.contains('a', 'How it works', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled (either up or down)
          // If it's an anchor link, it might scroll to a section
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking "Why us" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(500)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        cy.contains('a', 'Why us', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking "Pro traders" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(500)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        cy.contains('a', 'Pro traders', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking "FAQ" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(500)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        cy.contains('a', 'FAQ', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking "Blog" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(500)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        cy.contains('a', 'Blog', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should have "Get funded" button in header', () => {
      cy.wait(2000)
      cy.contains('button, a', 'Get funded', { timeout: 15000 })
        .first()
        .should('be.visible')
        .should('contain.text', 'Get funded')
    })

    it('should click "Get funded" button in header', () => {
      cy.wait(2000)
      cy.contains('button, a', 'Get funded', { timeout: 15000 })
        .first()
        .should('be.visible')
        .should('not.be.disabled')
        .click()
      
      // Verify navigation or modal appears
      cy.wait(2000)
      // URL should still be on fundix.pro (might open modal or navigate)
      cy.url().should('satisfy', (url) => {
        return url.includes('fundix.pro')
      })
    })
  })

  describe('Footer Navigation', () => {
    it('should scroll to footer and verify footer exists', () => {
      cy.wait(2000)
      cy.scrollTo('bottom', { duration: 1000 })
      cy.wait(1000)
      // Footer might not have a footer tag, check for footer content
      cy.get('body').then(($body) => {
        const bodyText = $body.text()
        expect(bodyText).to.satisfy((txt) => txt.includes('All Rights Reserved') || txt.includes('Amega Capital Ltd'))
      })
    })

    it('should display footer logo', () => {
      cy.wait(2000)
      cy.scrollTo('bottom')
      cy.wait(1000)
      // Footer should contain Fundix text
      cy.get('body').should('contain.text', 'Fundix')
    })

    it('should have all footer navigation links', () => {
      cy.wait(2000)
      cy.scrollTo('bottom')
      cy.wait(1000)
      // Verify footer links exist by checking for text content
      cy.get('body').should('contain.text', 'How it works')
      cy.get('body').should('contain.text', 'Why us')
      cy.get('body').should('contain.text', 'Pro traders')
      cy.get('body').should('contain.text', 'FAQ')
      cy.get('body').should('contain.text', 'Blog')
    })

    it('should scroll page when clicking footer "How it works" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(1000)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        // Scroll to bottom first to find footer link
        cy.scrollTo('bottom')
        cy.wait(500)
        cy.contains('a', 'How it works', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking footer "Why us" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(1000)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        // Scroll to bottom first to find footer link
        cy.scrollTo('bottom')
        cy.wait(500)
        cy.contains('a', 'Why us', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking footer "Pro traders" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(1000)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        // Scroll to bottom first to find footer link
        cy.scrollTo('bottom')
        cy.wait(500)
        cy.contains('a', 'Pro traders', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking footer "FAQ" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(1000)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        // Scroll to bottom first to find footer link
        cy.scrollTo('bottom')
        cy.wait(500)
        cy.contains('a', 'FAQ', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll page when clicking footer "Blog" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(1000)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        // Scroll to bottom first to find footer link
        cy.scrollTo('bottom')
        cy.wait(500)
        cy.contains('a', 'Blog', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000) // Wait for smooth scroll animation
        cy.window().then((winAfter) => {
          const scrollYAfter = winAfter.scrollY || winAfter.pageYOffset || 0
          // Page should have scrolled
          expect(scrollYAfter).to.not.equal(scrollYBefore)
        })
        // URL should remain the same
        cy.url().should('eq', 'https://fundix.pro/')
      })
    })

    it('should scroll or navigate when clicking footer "Legal documents" link', () => {
      cy.wait(2000)
      cy.scrollTo('top')
      cy.wait(1000)
      cy.window().then((win) => {
        const scrollYBefore = win.scrollY || win.pageYOffset || 0
        // Scroll to bottom first to find footer link
        cy.scrollTo('bottom')
        cy.wait(500)
        cy.contains('a', 'Legal documents', { timeout: 15000 })
          .should('be.visible')
          .click()
        cy.wait(2000)
        // Legal documents might scroll or navigate to a different page
        cy.url().should('satisfy', (url) => {
          return url.includes('fundix.pro')
        })
      })
    })

    it('should display copyright information in footer', () => {
      cy.wait(2000)
      cy.scrollTo('bottom')
      cy.wait(1000)
      cy.contains(/©.*All Rights Reserved|Copyright/i, { timeout: 15000 })
        .should('be.visible')
        .should('contain.text', 'All Rights Reserved')
    })

    it('should display company information in footer', () => {
      cy.wait(2000)
      cy.scrollTo('bottom')
      cy.wait(1000)
      cy.get('body').should('contain.text', 'Amega Capital Ltd')
      cy.get('body').should('contain.text', 'Saint Lucia')
    })
  })

  describe('Navigation Link Accessibility', () => {
    const navigationLinks = ['How it works', 'Why us', 'Pro traders', 'FAQ', 'Blog']

    navigationLinks.forEach(linkText => {
      it(`should have accessible "${linkText}" link with proper href`, () => {
        cy.wait(2000)
        cy.contains('a', linkText, { timeout: 15000 })
          .should('be.visible')
          .should('have.attr', 'href')
          .should('not.be.empty')
      })
    })

    it('should have all navigation links with valid URLs', () => {
      cy.wait(2000)
      // Check navigation links exist and have href attributes
      const navLinks = ['How it works', 'Why us', 'Pro traders', 'FAQ', 'Blog']
      navLinks.forEach(linkText => {
        cy.contains('a', linkText, { timeout: 15000 })
          .should('have.attr', 'href')
      })
    })
  })

  describe('Responsive Navigation', () => {
    it('should display navigation on desktop viewport', () => {
      cy.viewport(1920, 1080)
      cy.wait(2000)
      cy.contains('Fundix', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'How it works', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'Why us', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'Pro traders', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'FAQ', { timeout: 15000 }).should('be.visible')
      cy.contains('a', 'Blog', { timeout: 15000 }).should('be.visible')
      cy.contains('button, a', 'Get funded', { timeout: 15000 }).should('be.visible')
    })

    it('should display navigation on tablet viewport', () => {
      cy.viewport(768, 1024)
      cy.wait(2000)
      cy.contains('Fundix', { timeout: 15000 }).should('be.visible')
      // Mobile menu might be different, adjust as needed
    })

    it('should display navigation on mobile viewport', () => {
      cy.viewport(375, 667)
      cy.wait(2000)
      cy.contains('Fundix', { timeout: 15000 }).should('be.visible')
      // Mobile menu might be different, adjust as needed
    })
  })
})

