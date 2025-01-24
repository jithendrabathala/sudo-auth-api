import mongoose from "mongoose";
import { MONGO_DB, MONGO_URI } from "../config/env";
import logger from "../logger/winstone";

// function to connect to mongodb
const connectDB: () => void = async () => {
  try {
    const connectionInstance: typeof mongoose = await mongoose.connect(
      `${MONGO_URI}/${MONGO_DB}`
    );

    logger.info({
      message: `\nMongoDB connected: ${connectionInstance.connection.host} \n`,
      type: "db"
    });
  } catch (error: Error | any) {
    logger.error({
      message: `db connection error: ${error}`,
      type: "db"
    });
  }
};

export default connectDB;
