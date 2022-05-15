/// <reference types= "cypress" />

import testData from '../fixtures/TestData2.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err)
    return false;
})


describe('Musala Cypress Task', () => {

    it('TestCase3', () => {

        //Visit company Baseurl
        cy.visit('/')

        //Navigate to Careers menu 
        cy.get('#menu-main-nav-1 > li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-478 > a')
            .click({ force: true })

        //Click ‘Check our open positions’ button           
        cy.get('.link-wrapper > a > button.btn-1b').click()

        //Verify that ‘Join Us’ page is opened
        cy.url().should('include', ('/careers/join-us/'))

        //‘Select location’ dropdown select ‘Anywhere’
        cy.get('#get_location').select('Anywhere')

        //Choose open position by name (e.g. Experienced Automation QA Engineer)
        cy.get('#content > section > div.inner-wraper > article:nth-child(2) > div > a > div > div.front > h2')
            .and('contain', 'Automation QA Engineer').click()

        // verify General Description Section 
        cy.get(':nth-child(1) > .pull-right > .content-title > h2')
            .and('contain', 'General description')

        // verify Requirements Section 
        cy.get(':nth-child(1) > .pull-left > .content-title > h2')
            .and('contain', 'Requirements')

        // verify Responsibilities Section 
        cy.get(':nth-child(2) > .pull-right > .content-title > h2')
            .and('contain', 'Responsibilities')

        // verify What we offer Section 
        cy.get(':nth-child(2) > .pull-left > .content-title > h2')
            .and('contain', 'What we offer')

        //Verify and click on apply button  
        cy.get('.fancybox > .wpcf7-form-control')
            .should('be.visible')
            .click()

        //loop through the invalid data in TestData1.json file
        testData.forEach(data => {

            //fill required fileds
            cy.get('#cf-1').clear().type(data.Name)
            cy.get('#cf-2').clear().type(data.Email)
            cy.get('#cf-3').clear().type(data.Mobile)
            //Upload CV 
            const filePath = '../fixtures/Ahmed_Rezk_CV.pdf';
            cy.get('#cf-4').attachFile(filePath);

            //validate check the agreement button befor click on submit button
            cy.get('.btn-cf-submit').then(($button) => {
                const disabled = $button.filter(":disabled")
                if ($button.length === disabled.length) {

                    // accept agrement button
                    cy.get('#adConsentChx').click()
                    // Click on Submit Button
                    cy.get('.btn-cf-submit').click()
                }
                else {
                    // Click on Submit Button
                    cy.get('.btn-cf-submit').click()
                }
            })

            //Click on close button of error popup
            cy.get('.close-form').click()
            //Assert that the error messages appear
            cy.get(data.Selector)
                .should('have.text', data.Expected_Error)

        })
    })
})
