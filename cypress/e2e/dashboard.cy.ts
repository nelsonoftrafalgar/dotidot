describe('Dashboard spec', () => {
	it('Clicking on a variable in the list toggles variable highlight', () => {
		cy.visit('/')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(12)
			.click()
			.should('have.css', 'background-color', 'rgb(250, 238, 254)')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(12)
			.click()
			.should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
	})

	it('Clicking on a node in the tree chart toggles highlighting and reordering of variables in the list', () => {
		cy.visit('/')
		cy.get('text').contains('asdas').click()
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(0)
			.should('have.css', 'background-color', 'rgb(250, 238, 254)')
			.should('have.text', 'upraveny nazev')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(1)
			.should('have.css', 'background-color', 'rgb(250, 238, 254)')
			.should('have.text', 'nazev bez brandu')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(2)
			.should('have.css', 'background-color', 'rgb(250, 238, 254)')
			.should('have.text', 'product_name')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(3)
			.should('have.css', 'background-color', 'rgb(250, 238, 254)')
			.should('have.text', 'brand')

		cy.get('text').contains('asdas').click()
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(0)
			.should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
			.should('have.text', 'upraveny nazev')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(1)
			.should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
			.should('have.text', 'nazev bez brandu')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(2)
			.should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
			.should('have.text', 'zkouska pole')
		cy
			.get('[data-cy="variable-list"]')
			.children()
			.eq(3)
			.should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
			.should('have.text', 'zkouska promenne s podminkou')
	})
})
