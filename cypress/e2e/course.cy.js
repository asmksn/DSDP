import SignInPage from '/support/pageObjects/SignInPage';
import CoursePage from '/support/pageObjects/CoursePage';

describe('Course Tests', () => {
  const adminEmail = 'kibria.qa.bulipe@gmail.com';
  const adminPassword = 'Password@123';
  const courseName = 'QA Course ' + Math.floor(Math.random() * 1000);
  const filePath = 'Attachments/QA Course.jpg';

  beforeEach(() => {
    SignInPage.visit();
    SignInPage.login(adminEmail, adminPassword);
  });

  it('Create Course', () => {
    CoursePage.goToCourseList();
    CoursePage.addCourse(courseName, filePath);
    CoursePage.addModule('Module 1', 'Description 1');
    CoursePage.addModule('Module 2', 'Description 2');
    CoursePage.addModule('Module 3', 'Description 3');
    CoursePage.submitCourse();
    cy.contains(courseName).should('be.visible');
  });

  it('Delete Course', () => {
    CoursePage.goToCourseList();
    CoursePage.deleteCourse(courseName);
  });
});
