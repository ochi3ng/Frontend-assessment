describe("Login Page", () => {
    beforeEach(()=>{
   cy.visit('http://localhost:5173/login')
    })
    it("can visit login page", () => {
        cy.contains('Welcome to Album Manager')
       
    })
   
    it.only('can signup successfully', () => {
        cy.get('.font-semibold > a').click()
        cy.contains('Welcome! Please enter your information below to begin')
        cy.get('[type="email"]').type('johnochi908ng@gmail.com')
        cy.get('[placeholder="Password"]').type('john480220')
        cy.get('[placeholder="Re-Enter Password"]').type('john480220')
        cy.get('.border').click()
    })
    it.only('should login user', () => {
        cy.get('[type="email"]').type('johnochi908ng@gmail.com')
        cy.get('[type="password"]').type('john480220')
        cy.get('.border').click()
    })
})