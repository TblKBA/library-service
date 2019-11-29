import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class AddLogDto {
  @IsNotEmpty()
  @IsString()
  readonly method: string;

  @IsObject()
  readonly reqBody: object;

  @IsObject()
  readonly reqHeaders: object;

  @IsObject()
  readonly resHeaders: object;

  @IsObject()
  readonly resBody: object;

  @IsNumber()
  readonly status: number;

  @IsNumber()
  readonly date: Date;

  @IsString()
  path: string;
  /*
    @IsString()
    readonly source: string;*/
}
