import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({}),
  ],
});

const logs = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD/MMM/YYYY:HH:mm:ss Z',
    }),
    winston.format.printf((info) => `${process.env.APP_HOST} - [${info.timestamp}] - ${info.level}: "${info.message}"`),
  ),
  transports: [
    new winston.transports.Console({}),
  ],
});

export {
  logger,
  logs,
};
