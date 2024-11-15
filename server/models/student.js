'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsTo(models.Class, {
          foreignKey: 'classId',
          as: 'class' // optional alias
        });
    }
  }
  Student.init({
    classId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    batch: DataTypes.STRING,
    gender: DataTypes.STRING,
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Classes',
        key: 'id',
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};