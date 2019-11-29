import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateReadersDto } from '../readers/dto/create-readers.dto';

//export const ID_REGEX: RegExp = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

@Injectable()
export class CreateReadersDtoValidationPipe implements PipeTransform {
  transform(value: CreateReadersDto, metadata: ArgumentMetadata): CreateReadersDto {
   /* if (ID_REGEX.test(value.readTicket) || value.readTicket.length > 12) {
      throw new BadRequestException('ReadTicket ID must not contain digits, length must be < 13 symbols');
    }*/
    return value;
  }
}
