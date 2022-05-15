/// <reference types= "cypress" />

import testData from '../fixtures/TestData1.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err)
    return false;
})


describe('Musala Cypress Task', () => {

    it('TestCase1', () => {
        // visit company Baseurl
        cy.visit('/');

        //Scroll down to ‘Contact Us’
        cy.contains('Contact us').scrollIntoView()
            .click()
        testData.forEach(data => {

            //Cleare and Fill Form data
            cy.get('#cf-1').clear().type(data.Name);
            cy.get('#cf-2').clear().type(data.Email);
            cy.get('#cf-3').clear().type(data.Mobile);
            cy.get('#cf-4').clear().type(data.Subject);
            cy.get('#cf-5').clear().type(data.Message);

            //verify the Recaptcha
            //cy.get('#recaptcha-anchor').click

            // click on Submit Button
            cy.get('.btn-cf-submit').click();

            //validate check the Recaptcha checkbox
            //cy.get('.btn-cf-submit').should('contain.attr', 'aria-checked', 'true')

            //Assert that the error message, 'The e-mail address entered is invalid.’, appeared
            cy.get(':nth-child(4) > .wpcf7-form-control-wrap > .wpcf7-not-valid-tip')
                .should('have.text', 'The e-mail address entered is invalid.')

        })

    })
})