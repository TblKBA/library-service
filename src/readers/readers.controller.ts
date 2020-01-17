import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Put,
    Param,
    Delete,
    BadRequestException,
    UsePipes, UseInterceptors
} from '@nestjs/common';
import {ApiImplicitQuery, ApiUseTags} from '@nestjs/swagger';

import {ReadersService} from "./readers.service";
import {Observable} from "rxjs";
import {Readers} from "./entity/readers.entity";
import {catchError, first, flatMap, map} from "rxjs/operators";
import {RemovalReadersDto} from "./dto/removal-readers.dto";
import {UpdateReadersDto} from "./dto/update-readers.dto";
import { DatabaseException } from '../exceptions/database.exception';
import {CreateReadersDto} from "./dto/create-readers.dto";
import {CreateReadersPipe} from "../pipes/create-readers.pipe";
import {CreateReadersDtoValidationPipe} from "../pipes/create-readers-dto-validation.pipe";
import {
    NotFoundFieldsException,
    NotFoundFieldsExceptionR,
    SearchParams,
    SearchParamsR,
    SearchParamsWithError, SearchParamsWithErrorR
} from "../exceptions/search.params";
import {LoggingInterceptor} from "../interceptors/logging.interceptor";

@ApiUseTags('readers')
@UseInterceptors(LoggingInterceptor)
@Controller('readers')
export class ReadersController {
    constructor(private readonly readersService: ReadersService) {
    }

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full id/readTicket separately' })
    @ApiImplicitQuery({ name: 'id', required: false })
    @ApiImplicitQuery({ name: 'readTicket', required: false })
    get(@Query('query') query?: string,
        @Query('id') id?: number,
        @Query('readTicket') readTicket?: number,
    ): Observable<Readers[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.readersService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        }
        else if (readTicket || id ) {
            const searchParamsR: SearchParamsR = {
                readTicket: readTicket || null,
                id: id || null,
            };
            return this.readersService.search(searchParamsR)
                .pipe(
                    first(),
                    map((res: Readers[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithErrorR = { message: 'No readers found for given data', data: searchParamsR };
                            throw new NotFoundFieldsExceptionR(paramsWithError);
                        }
                        return res;
                    }),
                );
        }
        return this.readersService.getAll();
    }

    @Get(':readTicket')
        getById(@Param('readTicket') id: number): Observable<Readers> {
            return this.readersService.getById(id).pipe(
                first(),
            );
    }

   @Post(':Email')
   //@ApiImplicitQuery({ name: 'FIO', required: false })
  // @ApiImplicitQuery({ name: 'Email', required: false })
    @UsePipes(CreateReadersPipe, CreateReadersDtoValidationPipe)
        create(@Param('Email') email: string, @Body() options: CreateReadersDto): Observable<Readers> {
          return this.readersService.search(options)
                .pipe(
                    map(res => {
                        return res;
                    }),
                    flatMap(() => this.readersService.create(email,options)),
                    catchError(err => {
                        throw new DatabaseException(err.message);
                    }),
                );
    }

    @Put(':readTicket')
        update(@Param('readTicket') readTicket: number, @Body() options: UpdateReadersDto): Observable<Readers> {
            return this.readersService.update(readTicket, options)
                .pipe(
                    first(),
                    flatMap(res => this.readersService.getById(readTicket).pipe(first())),
                    catchError(err => {
                        throw new DatabaseException(err.message);
                    }),
                );
    }

    @Delete(':readTicket')
        delete(@Param('readTicket') readTicket: number): Observable<RemovalReadersDto> {
            return this.readersService.getById(readTicket).pipe(
                first(),
                flatMap(() => this.readersService.deleteById(readTicket)),
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
