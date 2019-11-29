import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {CreateBooksDto} from "../books/dto/create-books.dto";


@Injectable()
export class CreateBooksPipe implements PipeTransform {
    transform(opts: CreateBooksDto, metadata: ArgumentMetadata): CreateBooksDto {
        return Object.assign(opts, {
            idBook: opts.idBook,
        });
    }
}