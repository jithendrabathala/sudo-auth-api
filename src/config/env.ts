import { config } from "dotenv";

// process.env.NODE_ENV = process.env.NODE_ENV || 'development';

config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"
});

export const NODE_ENV: string = process.env.NODE_ENV || "local";

export const PORT: string = process.env.PORT || "8000";

export const MONGO_URI: string = process.env.MONGO_URI || "";
export const MONGO_DB: string = process.env.MONGO_DB || "";
