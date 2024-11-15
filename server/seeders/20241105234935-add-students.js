'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const students = Array.from({ length: 1 }, () => ({
      firstName: 'Marco',
      lastName: 'Seo',
      email: faker.internet.email(),
      city: 'fairfax',
      batch: "2401",
      gender: "Male",
      occupation: "software developer",
      classId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Students', [...students, {
      firstName: 'Ashton',
      lastName: 'Seo',
      email: faker.internet.email(),
      city: 'fairfax',
      batch: "2401",
      gender: "Male",
      occupation: "software developer",
      classId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Students', null, {});
  }
};
