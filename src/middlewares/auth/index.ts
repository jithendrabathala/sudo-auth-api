import * as jwt from "jsonwebtoken";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { UnauthorizedException } from "../../exceptions";
import { REFRESH_SECRET } from "../../config/env";
import asyncHandler from "../../utils/async-handler";
import { CustomRequest } from "../../types";

export const verifyRefreshToken: RequestHandler = asyncHandler(
  async (req: CustomRequest, _res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new UnauthorizedException("invalid refresh token");
    }

    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    if (!decoded) {
      throw new UnauthorizedException("invalid refresh token");
    }

    req.user = decoded;

    next();
  }
);
