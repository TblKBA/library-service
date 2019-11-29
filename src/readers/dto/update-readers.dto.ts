import { IsOptional, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateReadersDto{

  @IsOptional()
  @MaxLength(10)
  @ApiModelProperty({
    description: 'ID of a new reader',
    nullable: true,
    example: '1111111111',
    required: false,
    type: 'string',
    pattern: 'Int',
  })
  readonly readTicket?: number;

}
