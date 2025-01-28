import { Router } from "express";

import { login, register } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate";
import { LoginSchema, SignUpSchema } from "../validations";

const router: Router = Router();

router.post("/register", validateBody(SignUpSchema), register);
router.post("/login", validateBody(LoginSchema), login);

export default router;
