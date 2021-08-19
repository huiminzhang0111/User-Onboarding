describe('user app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    const userInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsInput = () => cy.get('input[name=terms]')
    const submitBtn = () => cy.get('button[id="SubmitBtn"]')

    it('sanity check to make sure tests work', () => {
        expect(1 + 2).to.equal(3)
        expect(2 + 2).not.to.equal(5) 
        expect({}).not.to.equal({}) 
        expect({}).to.eql({})      
      })
    
    it('the proper elements are showing', () => {
        userInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
        termsInput().should('exist')
        submitBtn().should('exist')
    })

    describe('filling out the inputs and cancelling', () => {
        it('can navigate to the site', () => {
            cy.url().should('include', 'localhost')
        })

        it('submit button starts out disabled', () => {
            submitBtn().should('be.disabled')
        })

        it('can type in the inputs', () => {
            userInput()
            .should('have.value', '')
            .type('Huimin')
            .should('have.value', 'Huimin')

            emailInput()
            .should('have.value', '')
            .type('huiminzhang0111@hotmail.com')
            .should('have.value', 'huiminzhang0111@hotmail.com')

            passwordInput()
            .should('have.value', '')
            .type('abc')
            .should('have.value', 'abc')

        })

        it('the submit button enables when all inputs are filled out', () => {
            userInput().type('Huimin')
            emailInput().type('huiminzhang0111@hotmail.com')
            passwordInput().type('abc')
            termsInput().click()
            submitBtn().should('not.be.disabled')
        })
    })

    describe('adding a new user', () => {
        it('can submit a new user', () => {
            userInput().type('Huimin')
            emailInput().type('huiminzhang0111@hotmail.com')
            passwordInput().type('abc')
            termsInput().click()
            submitBtn().click()
        })
    })
})