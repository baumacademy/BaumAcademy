'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate 50 random students
    const students = Array.from({ length: 50 }, (_, index) => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      city: faker.location.city(),
      batch: faker.number.int({ min: 2301, max: 2501 }).toString(),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      occupation: faker.person.jobTitle(),
      classId: faker.number.int({ min: 1, max: 4 }), // Random classId between 1 and 10
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Add specific predefined students (Marco and Ashton)
    students.push(
      {
        firstName: 'Marco',
        lastName: 'Seo',
        email: faker.internet.email(),
        city: 'fairfax',
        batch: "2401",
        gender: "Male",
        occupation: "software developer",
        classId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Ashton',
        lastName: 'Seo',
        email: faker.internet.email(),
        city: 'fairfax',
        batch: "2401",
        gender: "Male",
        occupation: "software developer",
        classId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

    return queryInterface.bulkInsert('Students', students);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
