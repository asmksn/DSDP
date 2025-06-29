describe('DSDP - Sign Up Suite', () => {
  const studentPassword = 'Bulipe@2025';
  const baseUrl = 'http://20.188.114.175:4000/';

  // Helper to generate unique emails using timestamp
  const generateEmail = () => `testuser+${Date.now()}@example.com`;

  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit(baseUrl);
  });

  // functions
  const goToSignUpPage = () => {
    cy.contains('button', 'Sign Up').click().wait(1500);
  };

  const fillSignUpForm = (email = '', password = '', confirmPassword = '') => {
    if (email) cy.get('[placeholder="Email"]').type(email);
    if (password) cy.get('[placeholder="Password"]').type(password);
    if (confirmPassword) cy.get('[placeholder="Confirm Password"]').type(confirmPassword);
  };

  const submitForm = () => {
    cy.get('button.border').click();
    cy.contains('button', 'Sign Up').click();
  };

  // Test Cases

  it('TC1: Valid SignUp with unique email', () => {
    const email = generateEmail();
    goToSignUpPage();
    fillSignUpForm(email, studentPassword, studentPassword);
    submitForm();
    cy.wait(5000);
    cy.contains('We have sent a code to your email.').should('be.visible'); 
  });

  it('TC2: Password mismatch', () => {
    const email = generateEmail();
    goToSignUpPage();
    fillSignUpForm(email, 'Password@123', 'Password@321');
    submitForm();
    cy.contains('Password does not match').should('be.visible');
  });

  it('TC3: Invalid email format', () => {
    goToSignUpPage();
    fillSignUpForm('invalidemail', studentPassword, studentPassword);
    submitForm();
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.contain("Please include an '@'");
    });
  });

  it('TC4: Sign up with existing email', () => {
    const existingEmail = 'shohanshohoz10@gmail.com'; // Already registered one
    goToSignUpPage();
    fillSignUpForm(existingEmail, studentPassword, studentPassword);
    submitForm();
    cy.contains('User already exists').should('be.visible');
  });

  it('TC5: All fields empty', () => {
    goToSignUpPage();
    submitForm();
  
    // Check for both email and password validation errors separately
    cy.contains('Email is required, Email must be a valid email address').should('be.visible');
    cy.contains('Password is required, Password must be at least 6 characters').should('be.visible');
    cy.contains('Confirm Password is required, Confirm Password must be at least 6 characters').should('be.visible');
  });

  it('TC6: Blank email field', () => {
    goToSignUpPage();
    fillSignUpForm('', studentPassword, studentPassword);
    submitForm();
    cy.get('input[type="email"]').should(($input) => {
      expect($input[0].validationMessage).to.contain("Please fill out this field");
    });
  });

  it('TC7: Short password', () => {
    const email = generateEmail();
    goToSignUpPage();
    fillSignUpForm(email, 'Short', 'Short');
    submitForm();
    cy.contains('Password must be at least 6 characters').should('be.visible');
  });

  // it('TC8: Numeric-only password', () => {
  //   const email = generateEmail();
  //   goToSignUpPage();
  //   fillSignUpForm(email, '12345678', '12345678');
  //   submitForm();
  //   cy.contains('Password must contain letters and special characters').should('be.visible');
  // });

  it('TC9: Email with leading/trailing spaces', () => {
    const email = `   user${Date.now()}@example.com   `;
    goToSignUpPage();
    fillSignUpForm(email, studentPassword, studentPassword);
    submitForm();
    cy.contains('Invalid email format').should('not.exist');
  });

  it('TC10: Confirm password is empty', () => {
    const email = generateEmail();
    goToSignUpPage();
    fillSignUpForm(email, studentPassword, '');
    submitForm();
    cy.get('[placeholder="Confirm Password"]').should(($input) => {
      expect($input[0].validationMessage).to.contain("Please fill out this field");
    });
  });

  // it('TC11: Weak password', () => {
  //   const email = generateEmail();
  //   goToSignUpPage();
  //   fillSignUpForm(email, 'password', 'password');
  //   submitForm();
  //   cy.contains('Password must be strong').should('be.visible');
  // });
  
  it('TC12: Agreement not checked - Sign Up button disabled', () => {
    const email = `user${Date.now()}@example.com`;
    cy.contains('button', 'Sign Up').click().wait(1500);
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Password"]').type(studentPassword);
    cy.get('[placeholder="Confirm Password"]').type(studentPassword);
    cy.contains('button', 'Sign Up').should('be.disabled');
  });

});

// describe('DSDP', () => {
//   const studentEmail = 'shohanshohoz101@gmail.com';
//   const studentPassword = 'Bulipe@2025';
//   const baseUrl = 'http://20.188.114.175:4000/';

//   beforeEach(() => {
//     cy.viewport(1366, 768);
//     cy.visit(baseUrl);
//   });

//   it('TC1: Valid SignUp', () => {
//     cy.contains('button', 'Sign Up').click().wait(2000);
//     cy.get('[placeholder="Email"]').should('be.visible').type(studentEmail);
//     cy.get('[placeholder="Password"]').type(studentPassword);
//     cy.get('[placeholder="Confirm Password"]').type(studentPassword);
//     cy.get('button.border').click()
//     cy.contains('button', 'Sign Up').click()
//   });    
//   it('TC2: Password mismatch', () => {
//     cy.contains('button', 'Sign Up').click().wait(2000);
//     cy.get('[placeholder="Email"]').type('useaar121@example.com');
//     cy.get('[placeholder="Password"]').type('Password@123');
//     cy.get('[placeholder="Confirm Password"]').type('Password@321');
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.contains('Password and confirm password did not match!').should('be.visible');
//   });
//   it('TC3: Invalid email format', () => {
//     cy.contains('button', 'Sign Up').click();
//     cy.get('[placeholder="Email"]').type('invalidemail');
//     cy.get('[placeholder="Password"]').type(studentPassword);
//     cy.get('[placeholder="Confirm Password"]').type(studentPassword);
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.get('input[type="email"]').then(($input) => {
//       expect($input[0].validationMessage).to.contain("Please include an '@'");
//     });
//   });
//   it('TC4: Sign up with existing email', () => {
//     cy.contains('button', 'Sign Up').click();
//     cy.get('[placeholder="Email"]').type(studentEmail); 
//     cy.get('[placeholder="Password"]').type(studentPassword);
//     cy.get('[placeholder="Confirm Password"]').type(studentPassword);
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()    
//     cy.contains('User already exists').should('be.visible'); 
//   });
//   it('TC5: All fields empty', () => {
//     cy.contains('button', 'Sign Up').click().wait(2000);
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.get('input[placeholder="Email"]').should(($input) => {
//       expect($input[0].validationMessage).to.contain("Please fill out this field");
//     });
//   });
//   it('TC6: Blank email field', () => {
//     cy.contains('button', 'Sign Up').click().wait(1500);
//     cy.get('[placeholder="Password"]').type(studentPassword);
//     cy.get('[placeholder="Confirm Password"]').type(studentPassword);
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.get('input[type="email"]').should(($input) => {
//       expect($input[0].validationMessage).to.contain("Please fill out this field");
//     });
//   });
//   it ('TC7: Short password', () => {
//     cy.contains('button', 'Sign Up').click().wait(1500);
//     cy.get('[placeholder="Email"]').type('newusaer2@example.com');
//     cy.get('[placeholder="Password"]').type('Short');
//     cy.get('[placeholder="Confirm Password"]').type('Short');
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.contains('Password must contain at least 6 characters').should('be.visible');
//   });
//   it('TC8: Numeric-only password', () => {
//     cy.contains('button', 'Sign Up').click();
//     cy.get('[placeholder="Email"]').type('numuser@example.com');
//     cy.get('[placeholder="Password"]').type('12345678');
//     cy.get('[placeholder="Confirm Password"]').type('12345678');
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.contains('Password must contain letters and special characters').should('be.visible'); 
//   });
  
//   it('TC9: Email with leading/trailing spaces', () => {
//     cy.contains('button', 'Sign Up').click().wait(1500);
//     cy.get('[placeholder="Email"]').type('   newuser1@example.com   ');
//     cy.get('[placeholder="Password"]').type(studentPassword);
//     cy.get('[placeholder="Confirm Password"]').type(studentPassword);
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.contains('Invalid email format').should('not.exist'); // or confirm it’s trimmed
//   });
//   it('TC10: Confirm password is empty', () => {
//     cy.contains('button', 'Sign Up').click().wait(1500);
//     cy.get('[placeholder="Email"]').type('user3@example.com');
//     cy.get('[placeholder="Password"]').type(studentPassword);
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.get('[placeholder="Confirm Password"]').should(($input) => {
//       expect($input[0].validationMessage).to.contain("Please fill out this field");
//     });
//   });
  
//   it('TC11: Weak password', () => {
//     cy.contains('button', 'Sign Up').click();
//     cy.get('[placeholder="Email"]').type('newuser@example.com');
//     cy.get('[placeholder="Password"]').type('password');
//     cy.get('[placeholder="Confirm Password"]').type('password');
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click()
//     cy.contains('Password must be strong').should('be.visible'); 
//   });
  
  
    
// });

// describe('DSDP - Sign Up Suite', () => {
//   const studentEmail = 'shohanshohoz101@gmail.com';
//   const studentPassword = 'Bulipe@2025';
//   const baseUrl = 'http://20.188.114.175:4000/';

//   beforeEach(() => {
//     cy.viewport(1366, 768);
//     cy.visit(baseUrl);
//   });

//   // 🔁 Helper Functions
//   const goToSignUpPage = () => {
//     cy.contains('button', 'Sign Up').click().wait(1500);
//   };

//   const fillSignUpForm = (email = '', password = '', confirmPassword = '') => {
//     if (email) cy.get('[placeholder="Email"]').type(email);
//     if (password) cy.get('[placeholder="Password"]').type(password);
//     if (confirmPassword) cy.get('[placeholder="Confirm Password"]').type(confirmPassword);
//   };

//   const submitForm = () => {
//     cy.get('button.border').click();
//     cy.contains('button', 'Sign Up').click();
//   };


//   it('TC1: Valid SignUp', () => {
//     goToSignUpPage();
//     fillSignUpForm(studentEmail, studentPassword, studentPassword);
//     submitForm();
//   });
//   it('TC1: Valid SignUp with unique email', () => {
//     const email = generateEmail();
//     goToSignUpPage();
//     fillSignUpForm(email, studentPassword, studentPassword);
//     submitForm();
//     // You can assert dashboard redirection or success toast if available
//   });

//   it('TC2: Password mismatch', () => {
//     goToSignUpPage();
//     fillSignUpForm('user121@example.com', 'Password@123', 'Password@321');
//     submitForm();
//     cy.contains('Password and confirm password did not match!').should('be.visible');
//   });

//   it('TC3: Invalid email format', () => {
//     goToSignUpPage();
//     fillSignUpForm('invalidemail', studentPassword, studentPassword);
//     submitForm();
//     cy.get('input[type="email"]').then(($input) => {
//       expect($input[0].validationMessage).to.contain("Please include an '@'");
//     });
//   });

//   it('TC4: Sign up with existing email', () => {
//     goToSignUpPage();
//     fillSignUpForm(studentEmail, studentPassword, studentPassword);
//     submitForm();
//     cy.contains('User already exists').should('be.visible');
//   });

//   it('TC5: All fields empty', () => {
//     goToSignUpPage();
//     submitForm();
//     cy.get('input[placeholder="Email"]').should(($input) => {
//       expect($input[0].validationMessage).to.contain("Please fill out this field");
//     });
//   });

//   it('TC6: Blank email field', () => {
//     goToSignUpPage();
//     fillSignUpForm('', studentPassword, studentPassword);
//     submitForm();
//     cy.get('input[type="email"]').should(($input) => {
//       expect($input[0].validationMessage).to.contain("Please fill out this field");
//     });
//   });

//   it('TC7: Short password', () => {
//     goToSignUpPage();
//     fillSignUpForm('newuser2@example.com', 'Short', 'Short');
//     submitForm();
//     cy.contains('Password must contain at least 6 characters').should('be.visible');
//   });

//   it('TC8: Numeric-only password', () => {
//     goToSignUpPage();
//     fillSignUpForm('numuser@example.com', '12345678', '12345678');
//     submitForm();
//     cy.contains('Password must contain letters and special characters').should('be.visible');
//   });

//   it('TC9: Email with leading/trailing spaces', () => {
//     goToSignUpPage();
//     fillSignUpForm('   newuser1@example.com   ', studentPassword, studentPassword);
//     submitForm();
//     cy.contains('Invalid email format').should('not.exist'); // if trimming is handled
//   });

//   it('TC10: Confirm password is empty', () => {
//     goToSignUpPage();
//     fillSignUpForm('user3@example.com', studentPassword, '');
//     submitForm();
//     cy.get('[placeholder="Confirm Password"]').should(($input) => {
//       expect($input[0].validationMessage).to.contain("Please fill out this field");
//     });
//   });

//   it('TC11: Weak password', () => {
//     goToSignUpPage();
//     fillSignUpForm('newuser@example.com', 'password', 'password');
//     submitForm();
//     cy.contains('Password must be strong').should('be.visible');
//   });

