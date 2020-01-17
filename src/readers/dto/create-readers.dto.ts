import {IsNotEmpty, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateReadersDto {
    id: number;
}
