import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {from, Observable, of} from "rxjs";
import {catchError, first, map} from "rxjs/operators";
import {Books} from "./entity/books.entity";
import {CreateBooksDto} from "./dto/create-books.dto";
import {UpdateBooksDto} from "./dto/update-books.dto";
import {prepareSearchParams, removeEmptyFields} from "../utils/utils";
import {SearchParams} from "../exceptions/search.params";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Books) private readonly booksRepository: Repository<Books>) {
    }

    getAll(): Observable<Books[]> {
        return from(this.booksRepository.find());
    }

    create(options: CreateBooksDto): Observable<Books> {
        return from(this.booksRepository.save(options));
    }

    getById(idBook: number): Observable<Books> {
        return from(this.booksRepository.findOneOrFail(idBook))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(idBook: number): Observable<DeleteResult> {
        return from(this.booksRepository.delete(idBook));
    }

    update(idBook: number, options: UpdateBooksDto): Observable<UpdateResult> {
        return from(this.booksRepository.update(idBook, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Books[]> {
        return from(this.booksRepository.query(
            `SELECT * FROM books WHERE idBook LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No idBook found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(params: CreateBooksDto): Observable<Books[]> {
        const rawParams: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(params));
        return from(this.booksRepository.find(rawParams));
    }
}
