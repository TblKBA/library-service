import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParams {
  idBook: number;
  name: string;
  author: string;
  amount: number;
}

export interface SearchParamsWithError {
  data: SearchParams;
  message: string;
}
