import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Books} from "./entity/books.entity";
import {LogModule} from "../logger/log.module";

@Module({
  imports: [TypeOrmModule.forFeature([Books]),LogModule],
  controllers: [BooksController],
  exports: [TypeOrmModule],
  providers: [BooksService]
})
export class BooksModule {}
