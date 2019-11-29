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
import {NotFoundFieldsException, SearchParamsG, SearchParamsWithError} from "../exceptions/search.paramsG";
import {catchError, first, flatMap, map} from "rxjs/operators";
import {DatabaseException} from "../exceptions/database.exception";
import {GiveoutService} from "./giveout.service";
import {Giveout} from "./entity/giveout.entity";
import {RemovalGiveoutDto} from "./dto/removal-giveout.dto";
import {CreateGiveoutPipe} from "../pipes/create-giveout.pipe";
import {CreateGiveoutDtoValidationPipe} from "../pipes/create-giveout-dto-validation.pipe";
import {CreateGiveoutDto} from "./dto/create-giveout.dto";
import {UpdateGiveoutDto} from "./dto/update-giveout.dto";
import {LoggingInterceptor} from "../interceptors/logging.interceptor";

@ApiUseTags('giveOut')
@UseInterceptors(LoggingInterceptor)
@Controller('giveout')
export class GiveoutController {
    constructor(private readonly giveoutService: GiveoutService) {}

    @Get()
    @ApiImplicitQuery({ name: 'query', required: false, description: 'Part of or full idGiveOut/idBook/dateGiveOut/dateReturn/readTicket separately' })
    @ApiImplicitQuery({ name: 'idGiveOut', required: false })
    @ApiImplicitQuery({ name: 'idBook', required: false })
    @ApiImplicitQuery({ name: 'dateGiveOut', required: false })
    @ApiImplicitQuery({ name: 'dateReturn', required: false })
    @ApiImplicitQuery({ name: 'readTicket', required: false })
    get(@Query('query') query?: string,
        @Query('idGiveOut') idGiveOut?: number,
        @Query('idBook') idBook?: number,
        @Query('dateGiveOut') dateGiveOut?: Date,
        @Query('dateReturn') dateReturn?: number,
        @Query('readTicket') readTicket?: number,
    ): Observable<Giveout[]> {
        if (query) {
            query = query.trim().replace(/[\/\\#,+()$~%'":*?<>{}]/g, '');
            if (query.length > 2) {
                return this.giveoutService.searchByAnyField(query);
            } else {
                throw new BadRequestException('Query length must be >2 symbols. Special characters will be removed.');
            }
        }
        else if (readTicket || idGiveOut || dateReturn || idBook ) {
            const searchParamsG: SearchParamsG = {
                idGiveOut: idGiveOut || null,
            };
            return this.giveoutService.search(searchParamsG)
                .pipe(
                    first(),
                    map((res: Giveout[]) => {
                        if (res && res.length === 0) {
                            const paramsWithError: SearchParamsWithError = { message: 'No giveout found for given data', data: searchParamsG };
                            throw new NotFoundFieldsException(paramsWithError);
                        }
                        return res;
                    }),
                );
        }
        return this.giveoutService.getAll();
    }

    @Get(':idGiveOut')
    getById(@Param('idGiveOut') idGiveOut: number): Observable<Giveout> {
        return this.giveoutService.getById(idGiveOut).pipe(
            first(),
        );
    }

    @Post()
    @UsePipes(CreateGiveoutPipe, CreateGiveoutDtoValidationPipe)
    create(@Body() options: CreateGiveoutDto): Observable<Giveout> {
        return this.giveoutService.search(options)
            .pipe(
                map(res => {
                    if (res && res.length !== 0) {
                        throw new ConflictException('idGiveOut already exists');
                    }
                    return res;
                }),
                flatMap(() => this.giveoutService.create(options)),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Put(':idGiveOut')
    update(@Param('idGiveOut') idGiveOut: number, @Body() options: UpdateGiveoutDto): Observable<Giveout> {
        return this.giveoutService.update(idGiveOut, options)
            .pipe(
                first(),
                flatMap(res => this.giveoutService.getById(idGiveOut).pipe(first())),
                catchError(err => {
                    throw new DatabaseException(err.message);
                }),
            );
    }

    @Delete(':idGiveOut')
    delete(@Param('idGiveOut') idGiveOut: number): Observable<RemovalGiveoutDto> {
        return this.giveoutService.getById(idGiveOut).pipe(
            first(),
            flatMap(() => this.giveoutService.deleteById(idGiveOut)),
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
