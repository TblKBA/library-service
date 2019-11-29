import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { Repository } from 'typeorm';
import { AddLogDto } from './dto/add-log.dto';

export enum SortType {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private readonly logRepo: Repository<Log>) {
  }

  async add(logDTO: AddLogDto): Promise<Log> {
    return this.logRepo.save(logDTO);
  }

  async getAll(limit?: number, offset?: number, sort?: SortType): Promise<Log[]> {
    return this.logRepo.find({
      order: { date: (sort || 'DESC') },
      skip: (offset && offset >= 0 ? offset : 0),
      take: (limit && limit >= 0 ? limit : 0),
    });
  }
}
