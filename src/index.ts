import httpServer from "./app";
import { PORT } from "./config/env";
import connectDB from "./db";

import logger from "./logger/winstone";

const startHttpServer: () => void = () => {
  httpServer.listen(PORT, () => {
    logger.info({
      message: `running on port number ${PORT}`,
      type: "server"
    });
  });
};

const startApp: () => void = async () => {
  try {
    await connectDB();
    startHttpServer();
  } catch (error: any) {
    logger.error({
      message: `error while starting server ${error}`,
      type: "server"
    });
  }
};

startApp();
