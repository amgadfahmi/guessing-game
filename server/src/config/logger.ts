import winston from 'winston';

const LoggerWrapper = (): winston.Logger => {
  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      }),
    ],
    exitOnError: false,
    format: winston.format.json(),
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  });
};

export const logger = LoggerWrapper();
