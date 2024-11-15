import { Sequelize, Model, DataTypes } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    { sequelize, modelName: "user" }
  );

  return User;
};
