import { Module } from '@nestjs/common';
import { ReadersController } from './readers.controller';
import { ReadersService } from './readers.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Readers} from "./entity/readers.entity";
import {LogModule} from "../logger/log.module";

@Module({
  imports: [TypeOrmModule.forFeature([Readers]), LogModule],
  controllers: [ReadersController],
  exports: [TypeOrmModule],
  providers: [ReadersService]
})
export class ReadersModule {}
