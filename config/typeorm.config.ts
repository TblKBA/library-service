import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Readers} from '../src/readers/entity/readers.entity';
import { Giveout} from '../src/giveout/entity/giveout.entity';
import { Books} from '../src/books/entity/books.entity';
import { Log } from '../src/logger/log.entity';

export let typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'std-mysql',
  port: 3306,
  username: 'std_265',
  password: '10731236',
  database: 'std_265',
  entities: [Readers,Giveout,Books,Log],
  synchronize: true,
};