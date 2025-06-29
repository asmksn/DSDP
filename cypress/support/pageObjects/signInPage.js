class SignInPage {
    visit() {
      cy.visit('http://20.188.114.175:4000/');
    }
  
    login(email, password) {
      cy.get('[placeholder="Email"]').type(email);
      cy.get('[placeholder="Password"]').type(password);
      cy.contains('button', 'Sign In').click({ force: true });
    }
  }
  
  export default new SignInPage();
  