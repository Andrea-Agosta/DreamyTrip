import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, errors } = format;

export const productionLogger = () => {
  const myFormat = printf(({ level, message, timestamp, stack, ...info }) => {
    return `${timestamp} | ${level} | ${message} | ${info.filePath} : ${info.method} | ${stack || ''}`;
  });
  return createLogger({
    level: 'info',
    format: combine(
      timestamp(),
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