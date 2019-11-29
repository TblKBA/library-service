import { Module } from '@nestjs/common';
import { GiveoutController } from './giveout.controller';
import { GiveoutService } from './giveout.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Giveout} from "./entity/giveout.entity";
import {LogModule} from "../logger/log.module";

@Module({
  imports: [TypeOrmModule.forFeature([Giveout]),LogModule],
  controllers: [GiveoutController],
  exports: [TypeOrmModule],
  providers: [GiveoutService]
})
export class GiveoutModule {}
