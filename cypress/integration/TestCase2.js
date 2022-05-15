/// <reference types= "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err)
    return false;
})


describe('Musala Cypress Task', () => {

    it('TestCase2', () => {



        // visit company Baseurl
        cy.visit('/');

        // Click on Company Tab
        cy.get('#menu-main-nav-1 > .menu-item-887 > .main-link').click({ force: true })
        //Verify Company URL Loads
        cy.url().should('include', 'musala.com/company/')

        //Verify Leadership Section
        cy.get('.company-members >.cm-content >h2')
            .contains('Leadership')

        //Redirect to Facebook Page  
        //cy.get('[href="https://www.facebook.com/MusalaSoft?fref=ts"]').invoke('removeAttr', 'target').click()
        // cy.get('[href="https://www.facebook.com/MusalaSoft?fref=ts"]').click()

        //we cant handle navigation to another tab by cypress and also we can't redirect to different doman as cypress 
        //Blocked a frame with origin "https://www.musala.com" from accessing a cross-origin frame.
        // Before the page load, you were bound to the origin policy:
        // > https://musala.com
        // A cross origin error happens when your application navigates to a new URL which does not match the origin policy above.


    })

})