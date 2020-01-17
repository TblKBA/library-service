import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {from, Observable, of} from "rxjs";
import {catchError, first, map} from "rxjs/operators";
import {prepareSearchParams, removeEmptyFields} from "../utils/utils";
import {Giveout} from "./entity/giveout.entity";
import {CreateGiveoutDto} from "./dto/create-giveout.dto";
import {UpdateGiveoutDto} from "./dto/update-giveout.dto";
import {SearchParamsG} from "../exceptions/search.params";

@Injectable()
export class GiveoutService {
    constructor(
        @InjectRepository(Giveout) private readonly giveoutRepository: Repository<Giveout>) {
    }

    getAll(): Observable<Giveout[]> {
        return from(this.giveoutRepository.find());
    }

    create(options: CreateGiveoutDto): Observable<Giveout> {
        return from(this.giveoutRepository.save(options));
    }

    getById(idGiveOut: number): Observable<Giveout> {
        return from(this.giveoutRepository.findOneOrFail(idGiveOut))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(idGiveOut: number): Observable<DeleteResult> {
        return from(this.giveoutRepository.delete(idGiveOut));
    }

    update(idGiveOut: number, options: UpdateGiveoutDto): Observable<UpdateResult> {
        return from(this.giveoutRepository.update(idGiveOut, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Giveout[]> {
        return from(this.giveoutRepository.query(
            `SELECT * FROM giveout WHERE idGiveOut LIKE "%${query}%"`))
            .pipe(
                first(),
                map(res => {
                    if (res && res.length === 0) {
                        throw new NotFoundException(`No giveout found by query: ${query}`);
                    }
                    return res;
                }),
            );
    }

    search(params: CreateGiveoutDto): Observable<Giveout[]> {
        const rawParams: Partial<SearchParamsG> = prepareSearchParams(removeEmptyFields(params));
        return from(this.giveoutRepository.find(rawParams));
    }
}
