import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateGiveoutDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @ApiModelProperty({
        description: 'idGiveOut ID give of reader',
        nullable: true,
        pattern: 'Int',
        example: '1111111111',
        required: false,
        type: 'string',
    })
    readonly idGiveOut?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @ApiModelProperty({
        description: 'idBook ID book',
        nullable: true,
        pattern: 'Int',
        example: '1111111111',
        required: false,
        type: 'string',
    })
    readonly idBook?: number;

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

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @ApiModelProperty({
        description: 'DateReturn book of library',
        nullable: true,
        pattern: 'Int',
        example: '17072019',
        required: false,
        type: 'string',
    })
    readonly dateReturn?: number;
}
