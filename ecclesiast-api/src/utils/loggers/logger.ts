import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf, colorize } = format;

const logFormat = printf(({ level, message, label: _label, timestamp: _timestamp }) => {
  return `${ _timestamp } [${ _label }] ${ level }: ${ message }`;
});

export const logger = createLogger({
  format: combine(
    colorize({ all: true }),
    label({ label: "Ecclesiast API" }),
    timestamp({ format: "DD-MM-YYYY HH:MM:SS::SSS" }),
    logFormat
  ),
  level: "debug",
  transports: [ new transports.Console() ]
});
