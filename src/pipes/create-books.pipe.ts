import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {CreateBooksDto} from "../books/dto/create-books.dto";
import {toCanonical} from "../utils/utils";


@Injectable()
export class CreateBooksPipe implements PipeTransform {
    transform(opts: CreateBooksDto, metadata: ArgumentMetadata): CreateBooksDto {
        return Object.assign(opts, {
           name : toCanonical(opts.name),
            author : toCanonical(opts.author),
            year : toCanonical(opts.year),
        });
    }
}