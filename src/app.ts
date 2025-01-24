import express, { Express, Request, Response } from "express";
import { createServer } from "http";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

const httpServer = createServer(app);

export default httpServer;
