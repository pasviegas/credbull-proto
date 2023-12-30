import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const logFormats = [winston.format.timestamp(), winston.format.ms()];

export const logger = WinstonModule.createLogger({
  format: winston.format.combine(...logFormats, winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(...logFormats, utilities.format.nestLike('api', { colors: true })),
    }),
  ],
});
