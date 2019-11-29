import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParams {
  readTicket: number;
  /*idBook: number;
  idGiveOut: number;*/
}

export interface SearchParamsB {
  idBook: number;
}

export interface SearchParamsWithError {
  data: SearchParams;
  message: string;
}
