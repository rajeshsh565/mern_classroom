import { Router } from "express";
import { login, logout } from "../Controllers/authController.js";
import { validateLoginInputs } from "../Middlewares/validationHandlerMiddleware.js";
const router = Router();

router.route("/login").post(validateLoginInputs,login);
router.route("/logout").get(logout);

export default router;