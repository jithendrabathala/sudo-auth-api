import winston, { createLogger, transports } from "winston";

// colour definitions
const levelColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue"
} as Record<string, string>;

const typeColors = {
  server: "\x1b[35m", // Magenta
  db: "\x1b[36m", // Cyan
  default: "\x1b[37m" // White
} as Record<string, string>;

const resetColor: string = "\x1b[0m";

// Get log level based on the environment
const level: string = (() => {
  return process.env.NODE_ENV === "production" ? "warn" : "debug";
})();

// formatter with colorized `type`
const format: winston.Logform.Format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({
    level: true,
    colors: levelColors
  }),
  winston.format.printf((info: winston.Logform.TransformableInfo) => {
    const {
      timestamp,
      level,
      message,
      type = "server"
    } = info as {
      timestamp: string;
      level: string;
      message: string;
      type?: string;
    };

    const typeColor: string = typeColors[type as string] || typeColors.default;

    return `${timestamp} ${level}: ${typeColor}[${type}]${resetColor} ${message}`;
  })
);

// custom log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
} as Record<string, number>;

// Create the logger
const logger: winston.Logger = createLogger({
  level,
  levels,
  format,
  transports: [new transports.Console()]
});

export default logger;
