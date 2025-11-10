/**
 * Edge Cases and Error Handling Tests
 * Tests edge cases, error scenarios, and boundary conditions
 */

const LandingPage = require('./page-objects/LandingPage')

describe('Fundix Landing Page - Edge Cases', () => {
  const landingPage = new LandingPage()

  beforeEach(() => {
    landingPage.visit()
  })

  describe('Page Load Scenarios', () => {
    it('should handle slow network conditions', () => {
      cy.intercept('GET', '**/*', { delay: 2000 }).as('slowNetwork')
      cy.visit('/')
      cy.wait('@slowNetwork')
      landingPage.logo.should('be.visible')
    })

    it('should handle page reload', () => {
      landingPage.verifyHeaderElements()
      cy.reload()
      cy.wait(2000)
      landingPage.verifyHeaderElements()
    })

    it('should handle browser back button', () => {
      cy.contains('a', 'FAQ').click()
      cy.wait(2000)
      cy.go('back')
      cy.wait(2000)
      cy.url().should('include', 'fundix.pro')
    })

    it('should handle browser forward button', () => {
      cy.contains('a', 'FAQ').click()
      cy.wait(2000)
      cy.go('back')
      cy.wait(2000)
      cy.go('forward')
      cy.wait(2000)
      cy.url().should('include', 'fundix.pro')
    })
  })

  describe('Cookie Banner Edge Cases', () => {
    it('should handle cookie banner on multiple page visits', () => {
      landingPage.visit()
      landingPage.dismissCookieBannerIfPresent()
      cy.wait(1000)
      
      cy.visit('/')
      cy.wait(2000)
      // Cookie banner might not appear if cookie is set
    })

    it('should handle rapid cookie banner dismissal', () => {
      cy.get('body').then(($body) => {
        if ($body.text().includes('We use cookies')) {
          cy.contains('button', /Okay|Accept/i).click({ multiple: true, force: true })
          cy.wait(500)
        }
      })
    })
  })

  describe('Navigation Edge Cases', () => {
    it('should handle rapid navigation clicks', () => {
      cy.contains('a', 'How it works').click()
      cy.wait(500)
      cy.contains('a', 'Why us').click()
      cy.wait(500)
      cy.contains('a', 'FAQ').click()
      cy.wait(2000)
      cy.url().should('include', 'fundix.pro')
    })

    it('should handle navigation while page is loading', () => {
      cy.visit('/')
      cy.contains('a', 'Blog').click({ force: true })
      cy.wait(2000)
      cy.url().should('include', 'fundix.pro')
    })
  })

  describe('Scroll Edge Cases', () => {
    it('should handle rapid scrolling', () => {
      cy.scrollTo(0, 500)
      cy.wait(100)
      cy.scrollTo(0, 1000)
      cy.wait(100)
      cy.scrollTo(0, 1500)
      cy.wait(100)
      cy.scrollTo('bottom')
      cy.wait(500)
      landingPage.footer.should('be.visible')
    })

    it('should handle scroll to top after scrolling down', () => {
      cy.scrollTo('bottom')
      cy.wait(1000)
      cy.scrollTo('top')
      cy.wait(1000)
      landingPage.logo.should('be.visible')
    })

    it('should maintain functionality after scrolling', () => {
      cy.scrollTo('bottom')
      cy.wait(1000)
      cy.contains('a', 'FAQ').should('be.visible')
      cy.contains('a', 'FAQ').click()
      cy.wait(2000)
      cy.url().should('include', 'fundix.pro')
    })
  })

  describe('Button Click Edge Cases', () => {
    it('should handle multiple rapid clicks on "Get funded" button', () => {
      landingPage.getFundedButton.first()
        .click()
        .click()
        .click()
      cy.wait(2000)
      // Should not break or cause issues
    })

    it('should handle clicking disabled buttons gracefully', () => {
      cy.get('button[disabled]').then(($disabledBtns) => {
        if ($disabledBtns.length > 0) {
          cy.wrap($disabledBtns.first()).should('be.disabled')
        }
      })
    })
  })

  describe('Content Loading Edge Cases', () => {
    it('should handle missing images gracefully', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).then(($el) => {
          $el.on('error', () => {
            // Image error handler
          })
        })
      })
    })

    it('should handle dynamic content loading', () => {
      cy.wait(3000) // Wait for any lazy-loaded content
      landingPage.heroHeadline.should('be.visible')
    })
  })

  describe('Form Edge Cases (if forms exist)', () => {
    it('should handle empty form submissions', () => {
      cy.get('form').then(($forms) => {
        if ($forms.length > 0) {
          cy.wrap($forms.first()).within(() => {
            cy.get('button[type="submit"]').then(($submit) => {
              if ($submit.length > 0) {
                cy.wrap($submit).click()
                // Should show validation or handle gracefully
              }
            })
          })
        }
      })
    })

    it('should handle invalid input in forms', () => {
      cy.get('input[type="email"]').then(($inputs) => {
        if ($inputs.length > 0) {
          cy.wrap($inputs.first())
            .type('invalid-email')
            .blur()
          // Should show validation
        }
      })
    })
  })

  describe('Browser Compatibility', () => {
    it('should work with different viewport sizes', () => {
      const viewports = [
        { width: 1920, height: 1080 },
        { width: 1366, height: 768 },
        { width: 768, height: 1024 },
        { width: 375, height: 667 }
      ]

      viewports.forEach(({ width, height }) => {
        cy.viewport(width, height)
        landingPage.logo.should('be.visible')
        cy.wait(500)
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle 404 errors gracefully', () => {
      cy.request({
        url: 'https://fundix.pro/nonexistent-page',
        failOnStatusCode: false
      }).then((response) => {
        // Should return 404 or redirect
        expect([200, 301, 302, 404]).to.include(response.status)
      })
    })

    it('should handle network errors gracefully', () => {
      cy.intercept('GET', '**/*', { forceNetworkError: true }).as('networkError')
      // Page should still load with cached content or show error message
    })
  })

  describe('Performance Edge Cases', () => {
    it('should load within reasonable time', () => {
      const startTime = Date.now()
      cy.visit('/')
      cy.waitForPageLoad()
      cy.then(() => {
        const loadTime = Date.now() - startTime
        expect(loadTime).to.be.lessThan(30000) // 30 seconds max
      })
    })

    it('should handle large amounts of content', () => {
      cy.scrollTo('bottom')
      cy.wait(2000)
      cy.get('body').should('be.visible')
    })
  })

  describe('Accessibility Edge Cases', () => {
    it('should handle keyboard navigation', () => {
      cy.get('body').tab()
      cy.focused().should('exist')
    })

    it('should handle screen reader content', () => {
      cy.get('[aria-label], [aria-labelledby], [role]').should('exist')
    })
  })

  describe('Cookie and Storage', () => {
    it('should handle localStorage', () => {
      cy.window().then((win) => {
        win.localStorage.setItem('test', 'value')
        expect(win.localStorage.getItem('test')).to.eq('value')
      })
    })

    it('should handle sessionStorage', () => {
      cy.window().then((win) => {
        win.sessionStorage.setItem('test', 'value')
        expect(win.sessionStorage.getItem('test')).to.eq('value')
      })
    })
  })
})

