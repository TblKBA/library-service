import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ReadersModule } from './readers/readers.module';
import { GiveoutModule } from './giveout/giveout.module';
import { BooksModule } from './books/books.module';
import { Connection } from 'typeorm';
import { typeOrmOptions } from '../config/typeorm.config';
import {LogModule} from "./logger/log.module";
import {LoggingInterceptor} from "./interceptors/logging.interceptor";

@Module({
  imports: [ReadersModule,
    GiveoutModule,
    BooksModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    LogModule],
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor],
  controllers: [AppController],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
