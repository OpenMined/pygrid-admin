describe('Sample Testing', () => {
  it('should pass', () => {
    cy.visit('/')
    cy.get('h1').should('have.text', 'Dashboard')
  })
})
