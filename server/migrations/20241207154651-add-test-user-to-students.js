"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Students",
      [
        {
          firstName: "Test",
          lastName: "User",
          email: "testuser@example.com",
          password: "hashed_password_here", // You may want to hash this if you have hashing logic in place
          city: "TestCity",
          batch: "2024",
          classId: 1, // Assuming a class with ID 1 exists
          gender: "Male",
          occupation: "Student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "Students",
      { email: "testuser@example.com" },
      {}
    );
  },
};
