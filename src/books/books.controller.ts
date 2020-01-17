import {
    BadRequestException,
    Body,
    ConflictException,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Query, UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {ApiImplicitQuery, ApiUseTags} from "@nestjs/swagger";
import {Observable} from "rxjs";
import {catchError, first, flatMap, map} from "rxjs/operators";
import {DatabaseException} from "../exceptions/database.exception";
import {BooksService} from "./books.service";
import {Books} from "./entity/books.entity";
import {RemovalBooksDto} from "./dto/removal-books.dto";
import {CreateBooksPipe} from "../pipes/create-books.pipe";
import {CreateBooksDtoValidationPipe} from "../pipes/create-books-dto-validation.pipe";
import {CreateBooksDto} from "./dto/create-books.dto";
import {UpdateBooksDto} from "./dto/update-books.dto";
import {NotFoundFieldsException, SearchParams, SearchParamsWithError} from "../exceptions/search.params";
import {LoggingInterceptor} from "../interceptors/logging.interceptor";

@ApiUseTags('books')
@UseInterceptors(LoggingInterceptor)
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full idBook/dateGiveOut/dateReturn/readTicket separately' })
    @ApiImplicitQuery({ name: 'idBook', required: false })
    @ApiImplicitQuery({ name: 'name', required: false })
    @ApiImplicitQuery({ name: 'author', required: false })
    @ApiImplicitQuery({ name: 'year', required: false })
    @ApiImplicitQuery({ name: 'amount', required: false })
    get(@Query('query') query?: string,
        @Query('idBook') idBook?: number,
        @Query('name') name?: string,
        @Query('author') author?: string,
        @Query('year') year?: Date,
        @Query('amount') amount?: number,
    ): Observable<Books[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.booksService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        }
        else if ( idBook || name || author || amount ) {
            const searchParams: SearchParams = {
                idBook: idBook || null,
                name: name || null,
                author: author || null,
                amount: amount || null,
            };
            return this.booksService.search(searchParams)
                .pipe(
                    first(),
                    map((res: Books[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithError = { message: 'No Books found for given data', data: searchParams };
                            throw new NotFoundFieldsException(paramsWithError);
                        }
                        return res;
                    }),
                );
        }
        return this.booksService.getAll();
    }

    @Get(':idBook')
    getById(@Param('idBook') idBook: number): Observable<Books> {
        return this.booksService.getById(idBook).pipe(
            first(),
        );
    }

    @Post()
    @UsePipes(CreateBooksPipe, CreateBooksDtoValidationPipe)
    create(@Body() options: CreateBooksDto): Observable<Books> {
        return this.booksService.search(options)
            .pipe(
                map(res => {
                    return res;
                }),
                flatMap(() => this.booksService.create(options)),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':idBook')
    update(@Param('idBook') idBook: number, @Body() options: UpdateBooksDto): Observable<Books> {
        return this.booksService.update(idBook, options)
            .pipe(
                first(),
                flatMap(res => this.booksService.getById(idBook).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':idBook')
    delete(@Param('idBook') idBook: number): Observable<RemovalBooksDto> {
        return this.booksService.getById(idBook).pipe(
            first(),
            flatMap(() => this.booksService.deleteById(idBook)),
            first(),
            map(res => res.raw.affectedRows),
            map(affectedRows => {
                return {
                    affectedRows,
                    ok: affectedRows && affectedRows > 0,
                };
            }),
            catchError(err => {
                throw new DatabaseException(err.message);
            }),
        );
    }
}

