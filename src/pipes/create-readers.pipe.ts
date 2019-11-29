import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateReadersDto } from '../readers/dto/create-readers.dto';
import { toCanonical } from '../utils/utils';

@Injectable()
export class CreateReadersPipe implements PipeTransform {
  /**
   * Transforms createReadersDto to proper format
   * @param opts
   * @param metadata
   */
  transform(opts: CreateReadersDto, metadata: ArgumentMetadata): CreateReadersDto {
    return Object.assign(opts, {
      readTicket: opts.readTicket,
    });
   /* return Object.assign(opts, {
      readTicket: toCanonical(opts.readTicket),
    });*/
  }
}
