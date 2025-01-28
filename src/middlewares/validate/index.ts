import { NextFunction, RequestHandler, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import { BadRequestException } from "../../exceptions";

const validate = (
  schema: ZodObject<any, any>,
  source: "body" | "params" | "query"
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorRes = JSON.parse(error.message);
        throw new BadRequestException(`${errorRes[0]?.message}`);
      }
      throw error;
    }
  };
};

export const validateBody = (schema: ZodObject<any, any>): RequestHandler => {
  return validate(schema, "body");
};

export const validateParams = (schema: ZodObject<any, any>): RequestHandler => {
  return validate(schema, "params");
};

export const validateQuery = (schema: ZodObject<any, any>): RequestHandler => {
  return validate(schema, "query");
};
