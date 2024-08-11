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
  body("firstName").notEmpty().withMessage("first name can not be empty"),
  body("lastName").notEmpty().withMessage("last name can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "email already exists!" });
      }
    }),
  body("password").notEmpty().withMessage("password can not be empty"),
]);

export const validateUserUpdateInputs = withValidationErrors([
  body("firstName").notEmpty().withMessage("first name can not be empty"),
  body("lastName").notEmpty().withMessage("last name can not be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can not be empty")
    .isEmail()
    .withMessage("enter valid email address"),
  body("assignedClassroom")
    .notEmpty()
    .withMessage("classroom to be assigned can not be empty"),
]);
