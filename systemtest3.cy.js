/// <reference types="cypress" />

//case 1
describe('User transfer money', () => {
    beforeEach(() => {
      cy.visit('http://172.20.10.6:8080/Bank/login.php')
      cy.get('input[name="email"]').type('admin123@gmail.com')
      cy.get('input[name="password"]').type('1234')
      cy.get('input[name="userlogin"]').click()
      cy.url({ timeout: 1000}).should('include', '/home.php')
      cy.contains('Transfer Money').click()
      cy.url({ timeout: 1000}).should('include', '/funds_transfer.php')
    })

    // Test Case 1: Insert valid receiver account & valid amount
    it('Insert valid receiver account & valid amount', () => {
        cy.get('input[name="otherNo"]').type('1748751310')
        cy.contains('Get Account Info').click()
        cy.get('input[name="amount"]').type('3000')
        cy.get('button[name="transferSelf"]').click()
        cy.on('window:alert', (text) => {
          expect(text).to.contain('Transfer Successfull')
        })
    })

    // Test Case 2: Insert invalid amount less than RM3000
    it('Insert invalid amount less than 3000', () => {
        cy.get('input[name="otherNo"]').type('1748751310')
         cy.contains('Get Account Info').click()
        cy.get('input[name="amount"]').type('2000')
        cy.get('button[name="transferSelf"]').click()
        cy.get('input[name="amount"]').should('have.prop', 'validity').then((validity) => {
          expect(validity.valid).to.be.false;
        })
    })

    // Test Case 3: Insert invalid amount exceeding balance
    it('Insert invalid amount exceeding balance', () => {
        cy.get('input[name="otherNo"]').type('1748751310')
         cy.contains('Get Account Info').click()
        cy.get('input[name="amount"]').type('10000000')
        cy.get('button[name="transferSelf"]').click()
        cy.get('input[name="amount"]').should('have.prop', 'validity').then((validity) => {
          expect(validity.valid).to.be.false;
        })
    })

    // Test Case 4: Insert invalid account number: no number
    it('Insert invalid account number: no number', () => {
        cy.get('input[name="otherNo"]').type('daniel')
        cy.contains('Get Account Info').click()
        cy.contains('Account No. daniel Does not exist')
    })

    // Test Case 4: Insert invalid account number: nonexistent account number
    it('Insert invalid account number: nonexistent account number', () => {
        cy.get('input[name="otherNo"]').type('191919191919')
        cy.contains('Get Account Info').click()
        cy.contains('Account No. 191919191919 Does not exist')
    })
})