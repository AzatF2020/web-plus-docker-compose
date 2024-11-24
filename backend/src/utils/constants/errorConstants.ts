import { HttpStatus } from '@nestjs/common';

export const httpErrorMessage = new Map([
  [HttpStatus.BAD_REQUEST, 'global.BAD_REQUEST'],
  [HttpStatus.UNAUTHORIZED, 'global.UNAUTHORIZED'],
  [HttpStatus.FORBIDDEN, 'global.FORBIDDEN'],
  [HttpStatus.NOT_FOUND, 'global.NOT_FOUND'],
  [HttpStatus.INTERNAL_SERVER_ERROR, 'global.INTERNAL_SERVER_ERROR'],
  [HttpStatus.CONFLICT, 'global.CONFLICT'],
]);
