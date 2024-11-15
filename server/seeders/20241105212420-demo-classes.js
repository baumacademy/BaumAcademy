'use strict';

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
    //  const classes = Array.from({ length: 1 }, () => ({
    //   subject: 'QA',
    //   content: '5months QA bootcamp',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }));

    return queryInterface.bulkInsert('Classes', [
      {
        subject: 'QA',
        content: '5months QA bootcamp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subject: 'Kids Coding',
        content: 'kids after-school coding class',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subject: 'Basic Computer Skill',
        content: 'very basic to advanced computer skills',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        subject: 'Korean Class',
        content: 'learn korean language and culture',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Classes', null, {});
  }
};
