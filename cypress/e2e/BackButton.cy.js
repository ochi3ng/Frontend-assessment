describe("User Page", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it("should login user", () => {
        cy.get('[type="email"]').type('johnochi378ng@gmail.com');
        cy.get('[type="password"]').type('john480220');
        cy.get('.border').click();


        cy.url().should('include', '/');
        cy.get(':nth-child(1) > .mt-4').should('be.visible').click();
        cy.get(':nth-child(3) > .mt-4').should('be.visible').click()

    });
});
