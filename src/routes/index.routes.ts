import { Router, Request, Response } from "express";
import authRouter from "./auth.routes";

const router: Router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello, world!");
});

router.use("/auth", authRouter);

export default router;
