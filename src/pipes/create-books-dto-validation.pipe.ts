import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateBooksDto} from "../books/dto/create-books.dto";

@Injectable()
export class CreateBooksDtoValidationPipe implements PipeTransform {
    transform(value: CreateBooksDto, metadata: ArgumentMetadata): CreateBooksDto {
        return value;
    }
}
