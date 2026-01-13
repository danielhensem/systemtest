describe('Manager User Account', () => {
beforeEach(() => {
cy.visit('http://172.20.10.6:8080/Bank/manager_login.php')
cy.get('input[name="email"]').type('manager@manager.com')
cy.get('input[name="password"]').type('1234')
cy.get('input[name="login"]').click()
cy.url({ timeout: 1000}).should('include', '/manager_home.php')
})
// Test Case 1: Add valid user
it('Check Button View', () => {
    cy.contains('View').click()
cy.url({ timeout: 1000}).should('include', '/view.php')
})
it('Check Button Send Notice', () => {
    cy.get('a.btn.btn-primary').contains('Send Notice').click();
cy.url({ timeout: 1000}).should('include', '/manager_notice.php')
})
it('Delete User Account', () => {
    cy.contains('Delete').click()
cy.url({ timeout: 1000}).should('include', '/manager_home.php')
})
})


describe('Send Notice to User', () => {
beforeEach(() => {
cy.visit('http://172.20.10.6:8080/Bank/manager_login.php')
cy.get('input[name="email"]').type('manager@manager.com')
cy.get('input[name="password"]').type('1234')
cy.get('input[name="login"]').click()
cy.url({ timeout: 1000}).should('include', '/manager_home.php')
cy.get('a.btn.btn-primary').contains('Send Notice').click();
cy.url({ timeout: 1000}).should('include', '/manager_notice.php')
})
it('Send Valid Notice', () => {
    cy.get('textarea[name="notice"]').type('Please be informed that…')
    cy.get('button[name="send"]').click();
    cy.contains('Successfully send').should('be.visible');
})
it('Send Invalid Notice', () => {
    cy.get('textarea[name="notice"]').type('Please be informed that…')
    cy.get('button[name="send"]').click();
    cy.get('textarea[name="notice"]').should('have.prop', 'validity').then((validity) => {
      expect(validity.valid).to.be.false;})
})

})


describe('Check Button Function in Homepage as User', () => {
    beforeEach(() => {
      cy.visit('http://172.20.10.6:8080/Bank/login.php')
      cy.get('input[name="email"]').type('admin123@gmail.com')
      cy.get('input[name="password"]').type('1234')
      cy.get('input[name="userlogin"]').click()
      cy.url({ timeout: 1000}).should('include', '/home.php')
    })

    // Test Case 1: Insert valid receiver account & valid amount
    it('Check Button Function Account', () => {
        cy.get('.navbar-toggler').click();
        cy.contains('Accounts').click()
        cy.url().should('include', '/account.php')
    })
        it('Check Button Function Account Statements', () => {
        cy.get('.navbar-toggler').click();
        cy.contains('Account Statements').click()
        cy.url().should('include', '/statement.php')
    })

})