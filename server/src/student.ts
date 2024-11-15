import { Sequelize, Model, DataTypes } from "sequelize";

export const StudentModel = (sequelize: Sequelize) => {
  class Student extends Model {}
  Student.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      city: DataTypes.STRING,
      batch: DataTypes.STRING,
      classId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Classes', // Name of the table in the database
          key: 'id',
        }
      },
      gender: DataTypes.ENUM("Male", "Female"),
      occupation: DataTypes.STRING
    },
    { sequelize, modelName: "student" }
  );

  return Student;
};
