import {IsNotEmpty, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateReadersDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @ApiModelProperty({
    description: 'ReadTicket ID of a new reader',
    nullable: true,
    pattern: 'Int',
    example: '1111111111',
    required: false,
    type: 'string',
  })
  readonly readTicket?: number;

}
