import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { HttpException } from "../../exceptions";
import logger from "../../logger/winstone";

export const errorMiddleware: ErrorRequestHandler = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error);

  if (error.errors) {
    logger.error(error.message);
  }

  res.status(error.statusCode ?? 500).json({
    message: error.message ?? "Internal server error",
    errors: error.errors ?? undefined
  });
};
