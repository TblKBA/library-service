import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {CreateGiveoutDto} from "../giveout/dto/create-giveout.dto";


@Injectable()
export class CreateGiveoutPipe implements PipeTransform {
    transform(opts: CreateGiveoutDto, metadata: ArgumentMetadata): CreateGiveoutDto {
        return Object.assign(opts, {
            idGiveOut: opts.idGiveOut,
        });
    }
}