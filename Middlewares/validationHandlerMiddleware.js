import { body, param, validationResult } from "express-validator";
import User from "../Models/User.js";
import Classroom from "../Models/Classroom.js";

const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => " " + error.msg);
        return res.status(500).json({ msg: errorMessages });
      }
      next();
    },
  ];
};

export const validateLoginInputs = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address"),
  body("password").notEmpty().withMessage("password can not be empty"),
]);

export const validateAddUserInputs = withValidationErrors([
  body("firstName").trim().notEmpty().withMessage("first name can not be empty"),
  body("lastName").trim().notEmpty().withMessage("last name can not be empty"),
  body("email").trim()
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('email already exists!');
      }
    }),
  body("password").trim().notEmpty().withMessage("password can not be empty"),
]);

export const validateUserUpdateInputs = withValidationErrors([
  body("firstName").trim().notEmpty().withMessage("first name can not be empty"),
  body("lastName").trim().notEmpty().withMessage("last name can not be empty"),
  body("email").trim()
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address"),
  body("assignedClassroom").trim()
    .custom((assignedClassroom, {req})=>{
      if(req.user.role!=='teacher' && !assignedClassroom){
        throw new Error("classroom to be assigned can not be empty")
      }
      return true;
    })
    .withMessage("classroom to be assigned can not be empty"),
]);
