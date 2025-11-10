/**
 * Cookie banner-related helper utilities
 * Provides reusable functions for cookie consent operations
 */

/**
 * Check if cookie banner exists
 * @returns {Cypress.Chainable<boolean>} True if cookie banner exists
 */
const cookieBannerExists = () => {
  return cy.get('body').then(($body) => {
    const bodyText = $body.text()
    return bodyText && bodyText.includes('We use cookies')
  })
}

/**
 * Find and click cookie accept button
 * @returns {Cypress.Chainable<boolean>} True if button was found and clicked
 */
const clickCookieAcceptButton = () => {
  return cy.get('body', { timeout: 10000 }).then(($body) => {
    try {
      const bodyText = $body.text()
      
      if (bodyText && bodyText.includes('We use cookies')) {
        const buttons = $body.find('button')
        let foundButton = null
        
        if (buttons && buttons.length > 0) {
          buttons.each((index, btn) => {
            try {
              const $btn = Cypress.$(btn)
              if ($btn && $btn.length > 0) {
                const btnText = $btn.text().trim().toLowerCase()
                
                if ((btnText === 'okay' || 
                     btnText === 'accept' || 
                     btnText === 'agree' || 
                     btnText === 'got it' ||
                     btnText === 'ok' ||
                     btnText.includes('okay') ||
                     btnText.includes('accept')) && 
                    $btn.is(':visible')) {
                  foundButton = $btn
                  return false // break loop
                }
              }
              } catch {
                // Ignore errors when checking individual buttons
              }
          })
        }
        
        if (foundButton && foundButton.length > 0) {
          // eslint-disable-next-line cypress/no-force
          cy.wrap(foundButton).click({ force: true })
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(500) // Wait for animation
          return true
        }
      }
      return false
    } catch {
      return false
    }
  })
}

/**
 * Dismiss cookie banner if present (non-blocking)
 */
const dismissCookieBannerIfPresent = () => {
  cookieBannerExists().then((exists) => {
    if (exists) {
      clickCookieAcceptButton()
    }
  })
}

/**
 * Verify cookie banner is dismissed
 */
const verifyCookieBannerDismissed = () => {
  cy.get('body').then(($body) => {
    const bannerExists = $body.find('[class*="cookie"], [data-testid*="cookie"]').length > 0
    if (bannerExists) {
      cy.contains(/We use cookies/i).should('not.be.visible')
    } else {
      cy.contains(/We use cookies/i).should('not.exist')
    }
  })
}

module.exports = {
  cookieBannerExists,
  clickCookieAcceptButton,
  dismissCookieBannerIfPresent,
  verifyCookieBannerDismissed
}

