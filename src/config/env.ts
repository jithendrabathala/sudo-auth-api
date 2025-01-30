import { config } from "dotenv";
import type { UnitAnyCase } from "./types";

process.env.NODE_ENV = "production";

config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"
});

export const NODE_ENV: string = process.env.NODE_ENV || "local";

export const PORT: string = process.env.PORT || "8000";

export const MONGO_URI: string = process.env.MONGO_URI || "";
export const MONGO_DB: string = process.env.MONGO_DB || "";

export const CORS_ORIGIN: string = process.env.CORS_ORIGIN || "";

export const ACCESS_SECRET: string = process.env.ACCESS_SECRET!;
export const ACCESS_EXPIRES_IN_UNIT = process.env
  .ACCESS_EXPIRES_IN_UNIT! as UnitAnyCase;
export const ACCESS_EXPIRES_IN_VALUE: number = parseInt(
  process.env.ACCESS_EXPIRES_IN_VALUE!
);

export const REFRESH_SECRET: string = process.env.REFRESH_SECRET!;
export const REFRESH_EXPIRES_IN_UNIT = process.env
  .REFRESH_EXPIRES_IN_UNIT! as UnitAnyCase;
export const REFRESH_EXPIRES_IN_VALUE: number = parseInt(
  process.env.REFRESH_EXPIRES_IN_VALUE!
);
