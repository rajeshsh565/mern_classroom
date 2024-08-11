import { Router } from "express";
import { createClassroom, getAllClassrooms, updateClassroom } from "../Controllers/classroomController.js";
import { validateUser } from "../Middlewares/authMiddleware.js";
import { authorizeUser } from "../Middlewares/authorizeUser.js";
const router = Router();

router.route("/create-classroom").post(validateUser, authorizeUser('principal'), createClassroom);
router.route("/update-classroom").post(validateUser, authorizeUser('principal'), updateClassroom);
router.route("/all-classrooms").get(validateUser, authorizeUser('principal'), getAllClassrooms);

export default router;