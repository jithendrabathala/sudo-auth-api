import { Request, RequestHandler, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../utils/async-handler";
import { BadRequestException } from "../exceptions";
import { createUser, loginUser, refreshTokenService } from "../services/auth";
import { SignUpSchema } from "../validations";
import { CustomRequest, IUser, TLoginResponse } from "../types";
import { NODE_ENV } from "../config/env";

export const register: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password, email, profilePic } = req.body;

    SignUpSchema.parse({ username, password, email, profilePic });

    await createUser({
      username,
      password,
      email,
      profilePic
    });

    res.status(201).json({ message: "User created successfully" });
  }
);

export const login: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      throw new BadRequestException("Please provide all required fields");
    }

    const response: TLoginResponse = await loginUser({
      usernameOrEmail,
      password
    });

    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "strict",
      secure: NODE_ENV === "production"
    });

    res
      .status(200)
      .json({ message: response.message, token: response.accessToken });
  }
);

export const refreshToken: RequestHandler = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const { id: userId } = req.user as JwtPayload & { id: string };

    const response: TLoginResponse = await refreshTokenService(userId);

    res
      .status(200)
      .json({ token: response.accessToken, message: response.message });
  }
);

export const logout: RequestHandler = asyncHandler(
  async (_req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User logged out successfully!!!" });
  }
);
