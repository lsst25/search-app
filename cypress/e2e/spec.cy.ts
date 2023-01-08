describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Search App')
    cy.contains('Home')
    cy.contains('News')
  })

  it('Do nothing in case of searching with empty search input', () => {
    cy.visit('/')
    cy.get('[data-testid="search-button"]').click()
    cy.wait(5000)
    cy.get('[data-testid="search-result-tile"').should('not.exist')
  })
})
