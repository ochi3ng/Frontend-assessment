describe("User Page", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it("should login user", () => {
        cy.get('[type="email"]').type('johnochi378ng@gmail.com');
        cy.get('[type="password"]').type('john480220');
        cy.get('.border').click();
        cy.get('.bg-blue-600').click()
    })
})