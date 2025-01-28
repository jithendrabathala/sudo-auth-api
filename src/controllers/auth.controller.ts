import { Request, RequestHandler, Response } from "express";
import asyncHandler from "../utils/async-handler";
import { BadRequestException } from "../exceptions";
import { createUser, loginUser } from "../services/auth";

export const register: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password, email, profilePic } = req.body;

    if (!username || !password || !email) {
      throw new BadRequestException("Please provide all required fields");
    }

    await createUser({ username, password, email, profilePic });

    res.status(201).json({ message: "User created successfully" });
  }
);

export const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      throw new BadRequestException("Please provide all required fields");
    }

    const response = await loginUser({ usernameOrEmail, password });

    res.status(200).json(response);
  }
);
