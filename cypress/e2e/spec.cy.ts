describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Search App')
    cy.contains('Home')
    cy.contains('News')
  })
})
