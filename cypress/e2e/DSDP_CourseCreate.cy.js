describe('DSDP', () => {
  const baseUrl = 'http://20.188.114.175:4000/';

  const AdminEmail = 'kibria.qa.bulipe@gmail.com';
  const AdminPassword = 'Password@123';
  

  const studentEmail = 'shohanshohoz10@gmail.com';// This email should be registered in the application
  const studentPassword = 'Bulipe@2025';

  const filePath = 'Attachments/QA Course.jpg'; // This file should be in the cypress/fixtures/files folder
  const CourseName = 'QA Course ' + Math.floor(Math.random() * 1000); // Generate a random course name

  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit(baseUrl).wait(2000);
  });

  it('TC1: Create a course and Delete', () => {
    cy.get('[placeholder="Email"]').type(AdminEmail);
    cy.get('[placeholder="Password"]').type(AdminPassword);
    cy.contains('button', 'Sign In').click({ force: true }).wait(5000);
    cy.contains('Course').click({ force: true }).wait(1500);
    cy.contains('Courses List').should('be.visible');
    
    cy.contains('+ Add new course').click({ force: true }).wait(1500);
    cy.get('#title').type(CourseName);
    cy.contains('Select program').click().get('[placeholder="Search..."]').type('Software').type('{downarrow}{enter}')
    cy.get('[placeholder="Type here"]').eq(0).type('This is a test course description.');
    cy.get('[placeholder="Type here"]').eq(1).type('This is a test course Objective for course.');
    cy.get('[placeholder="Type here"]').eq(2).type('This is a test course Outcome  for course.');

    cy.contains('Upload File').click({ force: true }).wait(500).attachFile(filePath);
    
    cy.get('[name="durationInHour"]').eq(0).clear().type('20');
    cy.get('[name="durationInHour"]').eq(1).clear().type('40');

    cy.contains('Create Course').click({ force: true }).wait(2500);
    cy.contains('Close').click({ force: true }).wait(500);
    
    cy.contains('+ Add Course Module').click({ force: true }).wait(500);
    cy.get('#moduleTitle').type('Test Module 1');
    cy.get('.space-y-6').find('textarea[placeholder="Type here"]').eq(3).type('description for module 1');
    cy.contains('Add Module').click({ force: true }).wait(500);
    
    cy.contains('+ Add Course Module').click({ force: true }).wait(500);
    cy.get('#moduleTitle').type('Test Module 2');
    cy.get('.space-y-6').find('textarea[placeholder="Type here"]').eq(3).type('description for module 2');
    cy.contains('Add Module').click({ force: true }).wait(500);
    
    cy.contains('+ Add Course Module').click({ force: true }).wait(500);
    cy.get('#moduleTitle').type('Test Module 3');
    cy.get('.space-y-6').find('textarea[placeholder="Type here"]').eq(3).type('description for module 3');
    cy.contains('Add Module').click({ force: true }).wait(500);

    cy.contains('button', 'Submit').click({ force: true }).wait(1000);
    cy.contains(CourseName).should('be.visible');



  });


  it('TC2: Delete Course', () => {
    cy.get('[placeholder="Email"]').type(AdminEmail);
    cy.get('[placeholder="Password"]').type(AdminPassword);
    cy.contains('button', 'Sign In').click({ force: true }).wait(5000);
    cy.contains('Course').click({ force: true }).wait(1500);
    cy.contains('Courses List').should('be.visible');
    //Delete added course
    cy.get('tbody tr').contains(CourseName).parents('tr').then($row => {
      cy.wrap($row).find('button').eq(1).click().wait(5000);
    });

    cy.get('[placeholder="Search"]').type(CourseName).wait(1000);
    //Check course is deleted or not
    cy.contains(CourseName).should('not.exist');
    
  });

});
