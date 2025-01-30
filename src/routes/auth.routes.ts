import { Router } from "express";

import { login, refreshToken, register } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate";
import { LoginSchema, SignUpSchema } from "../validations";
import { verifyRefreshToken } from "../middlewares/auth";

const router: Router = Router();

router.post("/register", validateBody(SignUpSchema), register);
router.post("/login", validateBody(LoginSchema), login);

router.get("/refresh-token", verifyRefreshToken, refreshToken);

export default router;
