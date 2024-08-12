import { Router } from "express";
import { createPrincipal, createStudent, createTeacher, deleteStudent, deleteTeacher, getAllStudents, getAllTeachers, getClassStudents, getCurrentUser, updateStudent, updateTeacher } from "../Controllers/userController.js";
import { validateUser } from "../Middlewares/authMiddleware.js";
import { authorizeUser } from "../Middlewares/authorizeUser.js";
import { validateAddUserInputs, validateUserUpdateInputs } from "../Middlewares/validationHandlerMiddleware.js";

const router = Router();

router.route("/current-user").get(validateUser,getCurrentUser);
router.route("/add-principal").post(createPrincipal);
router.route("/add-teacher").post(validateAddUserInputs,validateUser,authorizeUser('principal'),createTeacher);
router.route("/add-student").post(validateAddUserInputs,validateUser,authorizeUser('principal','teacher'),createStudent);
router.route("/getAllTeachers").get(validateUser,authorizeUser('principal'),getAllTeachers);
router.route("/getAllStudents").get(validateUser,authorizeUser('principal'),getAllStudents);
router.route("/getClassStudents").get(validateUser,authorizeUser('principal', 'teacher', 'student'),getClassStudents);
router.route("/update-teacher/:id").patch(validateUser,validateUserUpdateInputs,authorizeUser('principal'),updateTeacher);
router.route("/update-student/:id").patch(validateUser,validateUserUpdateInputs,authorizeUser('principal', 'teacher'),updateStudent);
router.route("/delete-teacher/:id").delete(validateUser,authorizeUser('principal'),deleteTeacher);
router.route("/delete-student/:id").delete(validateUser,authorizeUser('principal', 'teacher'),deleteStudent);

export default router;