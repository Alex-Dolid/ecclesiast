// Core
import { createLogger, format, Logger, transports } from "winston";

const { combine, timestamp, printf } = format;
const logFormat = printf(({ message, timestamp: _timestamp }) => `${ _timestamp } ${ message }`);

export const createFileLogger = (filename: string): Logger => createLogger({
  level: "error",
  format: combine(timestamp(), logFormat),
  transports: [ new transports.File({ filename, level: "error" }) ]
});
