import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';

@Injectable()
export class WinstonLoggerService implements WinstonModuleOptions {
  level: string;
  constructor() {}

  createWinstonModuleOptions() {
    return {
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new transports.Console({ format: format.simple() }),
        new transports.File({ filename: 'error.log', level: 'error' }),
      ],
    };
  }
}
