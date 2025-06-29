class CoursePage {
    goToCourseList() {
      cy.contains('Course').click({ force: true }).wait(1500);
      cy.contains('Courses List').should('be.visible');
    }
  
    addCourse(courseName, filePath) {
      cy.contains('+ Add new course').click({ force: true });
      cy.get('#title').type(courseName);
      cy.contains('Select program').click().get('[placeholder="Search..."]').type('Software{downarrow}{enter}');
      cy.get('[placeholder="Type here"]').eq(0).type('This is a test course description.');
      cy.get('[placeholder="Type here"]').eq(1).type('This is a test course Objective.');
      cy.get('[placeholder="Type here"]').eq(2).type('This is a test course Outcome.');
      cy.contains('Upload File').click({ force: true }).attachFile(filePath);
      cy.get('[name="durationInHour"]').eq(0).clear().type('20');
      cy.get('[name="durationInHour"]').eq(1).clear().type('40');
      cy.contains('Create Course').click({ force: true });
      cy.contains('Close').click({ force: true });
    }
  
    addModule(title, description) {
      cy.contains('+ Add Course Module').click({ force: true });
      cy.get('#moduleTitle').type(title);
      cy.get('.space-y-6').find('textarea[placeholder="Type here"]').eq(3).type(description);
      cy.contains('Add Module').click({ force: true });
    }
  
    submitCourse() {
      cy.contains('button', 'Submit').click({ force: true });
    }
  
    deleteCourse(courseName) {
      cy.get('tbody tr').contains(courseName).parents('tr').then($row => {
        cy.wrap($row).find('button').eq(1).click();
      });
      cy.get('[placeholder="Search"]').type(courseName);
      cy.contains(courseName).should('not.exist');
    }
  }
  
  export default new CoursePage();
  