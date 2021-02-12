describe('Sample Testing', () => {
  it('should have the heading', () => {
    cy.findByRole('heading', {name: 'PyGrid Admin'}).should('exist')
  })
})
