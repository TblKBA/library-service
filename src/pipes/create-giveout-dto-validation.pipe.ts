import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {CreateGiveoutDto} from "../giveout/dto/create-giveout.dto";


@Injectable()
export class CreateGiveoutDtoValidationPipe implements PipeTransform {
    transform(value: CreateGiveoutDto, metadata: ArgumentMetadata): CreateGiveoutDto {
        return value;
    }
}
