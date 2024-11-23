import express, { Express, Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Sequelize, Model, DataTypes } from "sequelize";
import bodyParser from "body-parser";
import { UserModel } from "./user";
import cors from "cors";
import { StudentModel } from "./student";
import { StudentType, StudentUpdateType } from "./student.model";
import { ClassModel } from "./class";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "127.0.0.1",
});

// const User = UserModel(sequelize);
const Student = StudentModel(sequelize);
const Class = ClassModel(sequelize);

// Define associations
Class.hasMany(Student, {
  foreignKey: "classId", // Use the classId as the foreign key in Student
  as: "students", // Alias for the association
});

Student.belongsTo(Class, {
  foreignKey: "classId", // Use the same foreign key
  as: "class", // Alias for the association
});

const SALT_ROUNDS = 10;

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/api", async (req: Request, res: Response) => {
//   const users = await User.findAll();
//   res.send(users);
// });

app.get("/api", async (req: Request, res: Response) => {
  const students = await Student.findAll();
  res.send(students);
});

app.get("/api/classes", async (req: Request, res: Response) => {
  const classes = await Class.findAll();
  res.send({ classes });
});

app.post("/api/student/create", async (req: Request, res: Response) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const isExisting = await Student.findOne({
    where: { email: req.body.email },
  });
  if (isExisting) {
    return res.send({
      message: "existing email",
      success: false,
    });
  }

  const student: StudentType = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    updatedAt: new Date(),
  };

  await Student.create(student);
  return res.send({
    message: "Student created successfully",
    success: true,
  });
});

app.post("/api/student/login", async (req: Request, res: Response) => {
  const getUser = await Student.findOne({ where: { email: req.body.email } });
  const user = await getUser?.toJSON();

  if (!user) {
    res.status(404).send({
      message: "User not found",
      success: false,
    });
  } else {
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (match) {
      res.send({
        message: "Login successful",
        user: { userId: user.id },
        success: true,
      });
    } else {
      res.status(401).send({
        message: "Incorrect password",
        success: false,
      });
    }
  }
});

app.get("/api/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await Student.findOne({
    where: { id },
    include: [
      {
        model: Class,
        as: "class",
        attributes: ["id", "subject", "content"],
      },
    ],
  });
  if (user) {
    return res.send({
      user,
      success: true,
    });
  } else {
    res.status(404).send({
      message: "cannot find user",
      success: false,
    });
  }
});

app.patch("/api/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const student: StudentUpdateType = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    updatedAt: new Date(),
    occupation: req.body.occupation,
    city: req.body.city,
    gender: req.body.gender,
    batch: req.body.batch,
    classId: req.body.class.id,
  };
  await Student.update(student, { where: { id } });
  return res.send({
    message: "Student updated successfully",
    success: true,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
