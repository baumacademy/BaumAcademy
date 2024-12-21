import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { StudentModel } from "./student";
// Define Class Attributes Interface
interface ClassAttributes {
  id: number;
  subject: string;
  content: string;
}

interface ClassCreationAttributes extends Optional<ClassAttributes, "id"> {}

export const ClassModel = (sequelize: Sequelize) => {
  class Class extends Model<ClassAttributes, ClassCreationAttributes> {
    public id!: number;
    public subject!: string;
    public content!: string;
  
    // Association: A Class can have many Students
    public students?: ReturnType<typeof StudentModel>[]; // Optional association
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,},
      subject: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    { sequelize, modelName: "class" }
  );

  return Class;
};

