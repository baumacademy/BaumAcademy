import { Sequelize, Model, DataTypes } from "sequelize";

export const ClassModel = (sequelize: Sequelize) => {
  class Class extends Model {}
  Class.init(
    {
      subject: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    { sequelize, modelName: "class" }
  );

  return Class;
};
