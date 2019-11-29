import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParamsG {
  idGiveOut: number;
}

export interface SearchParamsWithError {
  data: SearchParamsG;
  message: string;
}
