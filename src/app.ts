import express, { Express } from "express";
import { createServer, Server } from "http";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import requestIp from "request-ip";

import rootRouter from "./routes/index.routes";
import { CORS_ORIGIN } from "./config/env";
import { errorMiddleware } from "./middlewares/errors";
import { TooManyRequestsException } from "./exceptions";

const app: Express = express();

const httpServer: Server = createServer(app);

app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: CORS_ORIGIN.split(",") ?? "*", credentials: true }));
app.use(requestIp.mw());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: false,
    legacyHeaders: false,
    keyGenerator: (req) => req.clientIp as string,
    handler: (_req, _res, _next, _options) => {
      throw new TooManyRequestsException(
        `Rate limit reached for IP: ${_req.clientIp}`
      );
    }
  })
);

app.use("/api", rootRouter);

app.use(errorMiddleware);

export default httpServer;
