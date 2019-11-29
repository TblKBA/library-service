import {Injectable, NotFoundException} from '@nestjs/common';
import {Readers} from "./entity/readers.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {from, Observable, of} from "rxjs";
import { catchError, first, map } from 'rxjs/operators';
import {CreateReadersDto} from "./dto/create-readers.dto";
import { SearchParams } from '../exceptions/search.params';
import {UpdateReadersDto} from "./dto/update-readers.dto";
import {prepareSearchParams, removeEmptyFields} from "../utils/utils";

@Injectable()
export class ReadersService {
    constructor(
        @InjectRepository(Readers) private readonly readersRepository: Repository<Readers>) {
    }

    getAll(): Observable<Readers[]> {
        return from(this.readersRepository.find());
    }

     create(options: CreateReadersDto): Observable<Readers> {
         return from(this.readersRepository.save(options));
    }

    getById(readTicket: number): Observable<Readers> {
        return from(this.readersRepository.findOneOrFail(readTicket))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(readTicket: number): Observable<DeleteResult> {
        return from(this.readersRepository.delete(readTicket));
    }

    update(readTicket: number, options: UpdateReadersDto): Observable<UpdateResult> {
        return from(this.readersRepository.update(readTicket, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Readers[]> {
        return from(this.readersRepository.query(
            `SELECT * FROM readers WHERE readTicket LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No readers found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(params: CreateReadersDto): Observable<Readers[]> {
        const rawParams: Partial<SearchParams> = prepareSearchParams(removeEmptyFields(params));
        return from(this.readersRepository.find(rawParams));
    }
}
