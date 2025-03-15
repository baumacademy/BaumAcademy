import express, { Express, Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Sequelize, Model, DataTypes, Op } from "sequelize";
import bodyParser from "body-parser";
import { UserModel } from "./user";
import cors from "cors";
import { StudentModel } from "./student";
import { StudentType, StudentUpdateType } from "./student.model";
import { ClassModel } from "./class";
import { hasMissingValues } from "./utils/hasMissingValues";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Baum Academy API",
      version: "1.0.0",
      description: "API documentation for Baum Academy",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/index.ts"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/api", async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll({
      attributes: ["id", "firstName", "lastName", "occupation", "city"],
      include: [
        {
          model: Class,
          as: "class",
          attributes: ["id", "subject", "content"],
        },
      ],
    });
    res.send(students);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Retrieve a list of students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   occupation:
 *                     type: string
 *                   city:
 *                     type: string
 *                   class:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       subject:
 *                         type: string
 *                       content:
 *                         type: string
 */

app.get("/api/:id", async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A student object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     occupation:
 *                       type: string
 *                     city:
 *                       type: string
 *                     class:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         subject:
 *                           type: string
 *                         content:
 *                           type: string
 *                 success:
 *                   type: boolean
 */

// Search students by firstName, lastName, or email
app.get("/api/search/students", async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const students = await Student.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        {
          model: Class,
          as: "class",
          attributes: ["id", "subject", "content"],
        },
      ],
    });
    res.send(students);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/search/students:
 *   get:
 *     summary: Search students by firstName, lastName, or email
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   occupation:
 *                     type: string
 *                   city:
 *                     type: string
 *                   class:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       subject:
 *                         type: string
 *                       content:
 *                         type: string
 */

app.get("/api/classes", async (req: Request, res: Response) => {
  try {
    const classes = await Class.findAll();
    res.send({ classes });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Retrieve a list of classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   subject:
 *                     type: string
 *                   content:
 *                     type: string
 */

app.get("/api/classes/:classId", async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const classMates = await Class.findOne({
      where: { id: classId },
      include: [
        {
          model: Student, // Include associated students
          as: "students", // Alias, ensure it matches your association
          attributes: ["id", "firstName", "lastName", "occupation", "city", "email"]
        },
      ],
    });
    res.send({classMates: classMates?.students, subject: classMates?.subject});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/classes/{classId}:
 *   get:
 *     summary: Retrieve a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A class object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 classMates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       occupation:
 *                         type: string
 *                       city:
 *                         type: string
 *                       email:
 *                         type: string
 *                 subject:
 *                   type: string
 */

app.post("/api/student/create", async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/student/create:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

app.post("/api/student/login", async (req: Request, res: Response) => {
  try {
    const getUser = await Student.findOne({ where: { email: req.body.email } });
    const user = await getUser?.toJSON();

    if (!user) {
      res.send({
        message: "Incorrect password or username",
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
        res.send({
          message: "Incorrect password or username",
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/student/login:
 *   post:
 *     summary: Login a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                 success:
 *                   type: boolean
 */

app.patch("/api/:id", async (req: Request, res: Response) => {
  try {
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
    if(hasMissingValues(student)){
      return res.send({
        message: "fields cannot be empty, please fill out all fields",
        success: false
      });
    }
    await Student.update({...student}, { where: { id } });
    return res.send({
      message: "Student updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/{id}:
 *   patch:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               occupation:
 *                 type: string
 *               city:
 *                 type: string
 *               gender:
 *                 type: string
 *               batch:
 *                 type: string
 *               class:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

app.patch("/api/:id/course", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = {
      classId: req.body.classId,
    };
    await Student.update({...student}, { where: { id } });
    return res.send({
      message: "Student updated course successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/{id}/course:
 *   patch:
 *     summary: Update a student's course by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student updated course successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

app.get("/api/search/classes", async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const classes = await Class.findAll({
      where: {
        [Op.or]: [
          { subject: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      }
    });
    res.send(classes);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/search/classes:
 *   get:
 *     summary: Search classes by subject or content
 *     tags: [Classes]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   subject:
 *                     type: string
 *                   content:
 *                     type: string
 */

app.post("/api/classes/create", async (req: Request, res: Response) => {
  try {
    const newClass = {
      subject: req.body.subject,
      content: req.body.content,
    };

    const createdClass = await Class.create(newClass);
    return res.send({
      message: "Class created successfully",
      class: createdClass,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/classes/create:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 class:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     subject:
 *                       type: string
 *                     content:
 *                       type: string
 *                 success:
 *                   type: boolean
 */

app.patch("/api/classes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedClass = {
      subject: req.body.subject,
      content: req.body.content,
    };

    await Class.update(updatedClass, { where: { id } });
    return res.send({
      message: "Class updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

/**
 * @swagger
 * /api/classes/{id}:
 *   patch:
 *     summary: Update a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
