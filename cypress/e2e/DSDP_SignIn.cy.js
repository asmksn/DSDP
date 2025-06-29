describe('DSDP', () => {
  const baseUrl = 'http://20.188.114.175:4000/';
  const studentEmail = 'shohanshohoz10@gmail.com';
  const studentPassword = 'Bulipe@2025';

  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit(baseUrl);
  });

  it('TC1: Valid SignIn', () => {
    cy.get('[placeholder="Email"]').type(studentEmail);
    cy.get('[placeholder="Password"]').type(studentPassword);
    cy.contains('button', 'Sign In').click({ force: true }).wait(5000);
    cy.contains('Dashboard').should('be.visible');
  });

  it('TC2: Invalid email format', () => {
    cy.get('[placeholder="Email"]').type('invalidEmailFormat');
    cy.get('[placeholder="Password"]').type(studentPassword);
    cy.contains('button', 'Sign In').click();
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.contain("Please include an '@'");
    });
  });

  it('TC3: Incorrect password', () => {
    cy.get('[placeholder="Email"]').type(studentEmail);
    cy.get('[placeholder="Password"]').type('WrongPassword123');
    cy.contains('button', 'Sign In').click();
    cy.contains('Invalid email or password').should('be.visible');
  });

  it('TC4: Non-existent user', () => {
    cy.get('[placeholder="Email"]').type('nonexistentuser@example.com');
    cy.get('[placeholder="Password"]').type('AnyPassword123');
    cy.contains('button', 'Sign In').click();
    cy.contains('Invalid email or password').should('be.visible');
  });

  it('TC5: Empty email and password fields', () => {
    // cy.contains('button', 'Sign In').click();
    cy.contains('button', 'Sign In').should('be.disabled')
    // cy.get('input[type="email"]').should(($input) => {
    //   expect($input[0].validationMessage).to.contain('Please fill out this field');
    // });
  });

  it('TC6: Blank email field', () => {
    cy.get('[placeholder="Password"]').type(studentPassword);
    cy.contains('button', 'Sign In').should('be.disabled')
    // cy.contains('button', 'Sign In').click();
    // cy.get('input[type="email"]').should(($input) => {
    //   expect($input[0].validationMessage).to.contain('Please fill out this field');
    // });
  });

  it('TC7: Blank password field', () => {
    cy.get('[placeholder="Email"]').type(studentEmail);
    cy.contains('button', 'Sign In').should('be.disabled')
    // cy.contains('button', 'Sign In').click();
    // cy.get('input[type="password"]').should(($input) => {
    //   expect($input[0].validationMessage).to.contain('Please fill out this field');
    // });
  });
  it('TC8: Password with special characters only', () => {
    cy.get('[placeholder="Email"]').type('test@example.com');
    cy.get('[placeholder="Password"]').type('!@#$%^&*()');
    cy.contains('button', 'Sign In').click();
    cy.contains('Invalid email or password').should('be.visible');
  });
  it('TC9: Password case sensitivity', () => {
    cy.get('[placeholder="Email"]').type(studentEmail);
    cy.get('[placeholder="Password"]').type(studentPassword.toLowerCase());
    cy.contains('button', 'Sign In').click();
    cy.contains('Invalid email or password').should('be.visible');
  });
});
