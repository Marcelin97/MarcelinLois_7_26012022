const path = require("path");
const winston = require("winston");

// const colors = {
//   error: "red",
//   warn: "yellow",
//   info: "green",
//   http: "magenta",
//   debug: "white",
// };

// winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level.toUpperCase().padEnd(4)}: ${info.message}`
  )
);

const log = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
      format,
    }),
    new winston.transports.File({
      filename: path.join("logs", "info.log"),
      level: "info",
      format,
    }),
    new winston.transports.File({
      filename: path.join("logs", "combined.log"),
    }),
    new winston.transports.Console({
      level: "info",
      format,
    }),
  ],
  exceptionHandlers: [
    // Call exceptions.handle with a transport to handle exceptions
    new winston.transports.File({
      filename: path.join("logs", "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    // Call rejections.handle with a transport to handle rejections
    new winston.transports.File({
      filename: path.join("logs", "rejections.log"),
    }),
  ],
});

module.exports = log