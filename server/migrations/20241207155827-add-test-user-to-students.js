"use strict";

const bcrypt = require("bcrypt"); // Import bcrypt

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10); // Replace 'password123' with the desired plain-text password
    await queryInterface.bulkInsert(
      "Students",
      [
        {
          firstName: "Test",
          lastName: "User",
          email: "testuser@example.com",
          password: hashedPassword,
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
