import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundFieldsException extends HttpException {
  constructor(options: SearchParamsWithError) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export class NotFoundFieldsExceptionG extends HttpException {
  constructor(options: SearchParamsWithErrorG) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export class NotFoundFieldsExceptionR extends HttpException {
  constructor(options: SearchParamsWithErrorR) {
    super(options, HttpStatus.NOT_FOUND);
  }
}

export interface SearchParams{
  idBook: number;
  name: string;
  author: string;
  amount: number;
}

export interface SearchParamsG{
  readTicket: number;
  idGiveOut: number;
  dateReturn: number;
  idBook: number;
}

export interface SearchParamsR{
  readTicket: number;
  id: number;
}

export interface SearchParamsWithError {
  data: SearchParams;
  message: string;
}

export interface SearchParamsWithErrorG {
  data: SearchParamsG;
  message: string;
}

export interface SearchParamsWithErrorR {
  data: SearchParamsR;
  message: string;
}
