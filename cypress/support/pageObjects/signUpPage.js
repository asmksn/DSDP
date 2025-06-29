class SignUpPage {
    visit() {
      cy.visit('http://20.188.114.175:4000/');
      cy.contains('button', 'Sign Up').click();
    }
  
    fillForm(email, password, confirmPassword) {
      if (email) cy.get('[placeholder="Email"]').type(email);
      if (password) cy.get('[placeholder="Password"]').type(password);
      if (confirmPassword) cy.get('[placeholder="Confirm Password"]').type(confirmPassword);
    }
  
    submit() {
      cy.get('button.border').click();
      cy.contains('button', 'Sign Up').click();
    }
  }
  
  export default new SignUpPage();
  