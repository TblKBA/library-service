import {IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {MAX_AUTHOR_LENGTH, MAX_NAME_LENGTH} from "../entity/books.entity";

export class UpdateBooksDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_NAME_LENGTH)
    @ApiModelProperty({
        description: 'Name of a new book',
        maxLength: MAX_NAME_LENGTH,
        nullable: false,
        example: 'The Picture of Dorian Gray',
        required: true,
    })
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_AUTHOR_LENGTH)
    @ApiModelProperty({
        description: 'Name author of a new books',
        maxLength: MAX_AUTHOR_LENGTH,
        nullable: false,
        example: 'Oscar Wilde',
        required: true,
    })
    readonly author: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    @ApiModelProperty({
        description: 'Year of a writing a book',
        nullable: true,
        pattern: 'yyyy-mm-dd',
        example: '1999-06-28',
        required: false,
        type: 'string',
    })
    readonly year?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @ApiModelProperty({
        description: 'Amount of book',
        nullable: true,
        pattern: 'Int',
        example: '3',
        required: false,
        type: 'string',
    })
    readonly amount?: number;
}
