import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParamsG {
  idBook: number;
}

export interface SearchParamsWithError {
  data: SearchParamsG;
  message: string;
}
