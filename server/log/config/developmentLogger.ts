import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, errors } = format;

export const devlopmentLogger = () => {
  const myFormat = printf(({ level, message, timestamp, stack, ...info }) => {
    return `${timestamp} | ${level} | ${message} | ${(info.filePath) ? `${info.filePath} : ${info.method} | ${stack || ''}` : `${stack || ''}`}`;
  });
  return createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      timestamp({ format: "HH:mm:ss" }),
      errors({ stack: true }),
      myFormat
    ),

    transports: [
      new transports.Console(),
      new transports.File({
        filename: './log/info.log',
        level: 'info',
      }),
      new transports.File({
        filename: './log/warn.log',
        level: 'warn',
      }),
      new transports.File({
        filename: './log/errors.log',
        level: 'error',
      }),
    ],
  });
}
