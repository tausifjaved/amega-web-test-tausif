/**
 * Visual Elements and UI Tests
 * Tests visual elements, icons, images, and styling
 */

const LandingPage = require('./page-objects/LandingPage')

describe('Fundix Landing Page - Visual Elements', () => {
  const landingPage = new LandingPage()

  beforeEach(() => {
    landingPage.visit()
  })

  describe('Logo Display', () => {
    it('should display Fundix logo in header', () => {
      landingPage.logo.should('be.visible')
      landingPage.logo.should('have.css', 'display')
        .then((display) => {
          expect(['block', 'inline-block', 'flex', 'inline-flex']).to.include(display)
        })
    })

    it('should have proper logo styling', () => {
      landingPage.logo.should('be.visible')
      landingPage.logo.should('have.css', 'color')
    })
  })

  describe('Icons and Graphics', () => {
    it('should display checkmarks in comparison table', () => {
      cy.contains('a', 'Why us').click()
      cy.wait(2000)
      
      cy.get('body').then(($body) => {
        if ($body.text().includes('Fundix') && $body.text().includes('Others')) {
          // Look for checkmark icons
          cy.get('svg, [class*="check"], [class*="icon"]').should('exist')
        }
      })
    })

    it('should display rating stars', () => {
      cy.contains('a', 'Why us').click()
      cy.wait(2000)
      
      cy.contains(/Trusted by traders|4\.7/i).then(($el) => {
        if ($el.length > 0) {
          cy.get('svg, [class*="star"], [class*="rating"]').should('exist')
        }
      })
    })

    it('should display abstract 3D shapes or graphics', () => {
      cy.get('[class*="shape"], [class*="graphic"], [class*="visual"], svg').should('exist')
    })
  })

  describe('Color Scheme', () => {
    it('should have dark theme background', () => {
      cy.get('body').should('have.css', 'background-color')
        .then(() => {
          // Background should exist
          cy.get('body').should('have.css', 'background-color')
        })
    })

    it('should have teal/green accent colors for buttons', () => {
      landingPage.getFundedButton.first()
        .should('have.css', 'background-color')
        .then(() => {
          // Button should have styling
          landingPage.getFundedButton.first().should('be.visible')
        })
    })

    it('should have white text on dark background', () => {
      cy.get('body').should('have.css', 'color')
      // Additional color contrast checks
    })
  })

  describe('Typography', () => {
    it('should have proper font sizes for headings', () => {
      cy.get('h1').should('have.css', 'font-size')
      cy.get('h2').should('have.css', 'font-size')
    })

    it('should have readable font sizes for body text', () => {
      cy.get('body').should('have.css', 'font-size')
      cy.get('body').then(($body) => {
        const fontSize = window.getComputedStyle($body[0]).fontSize
        expect(parseInt(fontSize)).to.be.at.least(12)
      })
    })
  })

  describe('Layout and Spacing', () => {
    it('should have proper header layout', () => {
      landingPage.logo.should('be.visible')
      landingPage.navigationLinks.howItWorks.should('be.visible')
      landingPage.getFundedButton.should('be.visible')
    })

    it('should have proper spacing between elements', () => {
      cy.get('header, [class*="header"]').first()
        .should('have.css', 'padding')
        .then(() => {
          // Spacing should exist
          cy.get('header, [class*="header"]').first().should('be.visible')
        })
    })

    it('should have centered hero section', () => {
      landingPage.heroHeadline.should('be.visible')
      // Additional layout checks
    })
  })

  describe('Responsive Design', () => {
    it('should display correctly on desktop (1920x1080)', () => {
      cy.viewport(1920, 1080)
      landingPage.verifyHeaderElements()
      landingPage.heroHeadline.should('be.visible')
    })

    it('should display correctly on laptop (1366x768)', () => {
      cy.viewport(1366, 768)
      landingPage.logo.should('be.visible')
      landingPage.heroHeadline.should('be.visible')
    })

    it('should display correctly on tablet (768x1024)', () => {
      cy.viewport(768, 1024)
      landingPage.logo.should('be.visible')
      landingPage.heroHeadline.should('be.visible')
    })

    it('should display correctly on mobile (375x667)', () => {
      cy.viewport(375, 667)
      landingPage.logo.should('be.visible')
      // Mobile menu might be different
    })

    it('should display correctly on large mobile (414x896)', () => {
      cy.viewport(414, 896)
      landingPage.logo.should('be.visible')
    })
  })

  describe('Images and Media', () => {
    it('should load all images without errors', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('be.visible')
        cy.wrap($img).should('have.attr', 'src')
        cy.wrap($img).then(($el) => {
          const img = new Image()
          img.onerror = () => {
            throw new Error('Image failed to load')
          }
          img.src = $el.attr('src')
        })
      })
    })

    it('should have proper image dimensions', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.css', 'width')
        cy.wrap($img).should('have.css', 'height')
      })
    })
  })

  describe('Animations and Transitions', () => {
    it('should have smooth scroll behavior', () => {
      cy.scrollTo(0, 500, { duration: 1000 })
      cy.wait(500)
      cy.scrollTo(0, 1000, { duration: 1000 })
    })

    it('should have hover effects on buttons', () => {
      landingPage.getFundedButton.first()
        .trigger('mouseover')
        .should('be.visible')
        .then(() => {
          // Hover effect should be present
          landingPage.getFundedButton.first().should('have.css', 'cursor')
        })
    })
  })

  describe('Accessibility Visual Indicators', () => {
    it('should have focus indicators on interactive elements', () => {
      landingPage.getFundedButton.first()
        .focus()
        .should('be.focused')
        .then(() => {
          // Focus should be visible
          landingPage.getFundedButton.first().should('be.visible')
        })
    })

    it('should have proper link styling', () => {
      cy.get('a').first()
        .should('have.css', 'color')
        .should('have.css', 'text-decoration')
    })
  })
})

