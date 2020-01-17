import {Injectable, NotFoundException} from '@nestjs/common';
import {Readers} from "./entity/readers.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {from, Observable, of} from "rxjs";
import { catchError, first, map } from 'rxjs/operators';
import {CreateReadersDto} from "./dto/create-readers.dto";
import {SearchParamsG} from '../exceptions/search.params';
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

    create(email:string, options: CreateReadersDto): Observable<Readers> {
         this.getUser(email)
             .then( (result) => {
                 options.id = result;
             })
             .catch( (err) => {
                 console.log(err);
             });
        return from(this.readersRepository.save(options));
    }

    getById(id: number): Observable<Readers> {
        return from(this.readersRepository.findOneOrFail(id))
            .pipe(
                catchError(e => {
                    if (e.name === 'EntityNotFound') {
                        throw new NotFoundException(e.message);
                    }
                    return of(e);
                }),
            );
    }

    deleteById(id: number): Observable<DeleteResult> {
        return from(this.readersRepository.delete(id));
    }

    update(id: number, options: UpdateReadersDto): Observable<UpdateResult> {
        return from(this.readersRepository.update(id, Object.assign(options)));
    }

    searchByAnyField(query: string): Observable<Readers[]> {
        return from(this.readersRepository.query(
            `SELECT * FROM readers WHERE id LIKE "%${query}%"`))
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
        const rawParams: Partial<SearchParamsG> = prepareSearchParams(removeEmptyFields(params));
        return from(this.readersRepository.find(rawParams));
    }

    async getUser(email) {
       try {
            const axios = require('axios').default;
            const response = await axios.get('http://persons.std-247.ist.mospolytech.ru/person?email='+ email);
            return (response.data[0].id);
        } catch (error) {
            console.log(error);
        }
    }
}
