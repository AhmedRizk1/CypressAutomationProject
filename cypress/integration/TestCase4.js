/// <reference types= "cypress" />

import testData from '../fixtures/TestData1.json'

Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err)
    return false;
})


describe('Musala Cypress Task', () => {

    it('TestCase4', () => {

        //Visit company Baseurl
        cy.visit('/')

        //Navigate to Careers menu 
        cy.get('#menu-main-nav-1 > li.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-478 > a')
            .click({ force: true })

        //Click ‘Check our open positions’ button            
        cy.get('.link-wrapper > a > button.btn-1b').click()

        //Verify that ‘Join Us’ page is opened
        cy.url().should('include', ('/careers/join-us/'))

        //Get the open positions by city
        cy.get('#content > section > div.inner-wraper > article')
            .find('a')
            .then(($a) => {
                $a.filter(el => ["Sofia", "Skopje"].findIndex(item => item === Cypress.$(el).find(".card-jobsHot__location").text())).map((i, el) => {
                    if (Cypress.$(el).find(".card-jobsHot__location").text() === "Sofia" || Cypress.$(el).find(".card-jobsHot__location").text() === "Skopje")
                        console.log('URL', Cypress.$(el).attr('href'), '\n', "Position", Cypress.$(el).find(".card-jobsHot__title").text(), '\n', "Location", Cypress.$(el).find(".card-jobsHot__location").text())
                    cy.log('URL', Cypress.$(el).attr('href'), "\n", "Position", Cypress.$(el).find(".card-jobsHot__title").text(), "\n", "Location", Cypress.$(el).find(".card-jobsHot__location").text())
                })
            })



    })
})