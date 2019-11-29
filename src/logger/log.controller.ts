import { Controller, Get, Query } from '@nestjs/common';
import { LogService, SortType } from './log.service';
import { ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('logs')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {
  }

  @Get()
  @ApiImplicitQuery({ name: 'sort', required: false, enum: ['ASC', 'DESC'] })
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiImplicitQuery({ name: 'offset', required: false })
  getAll(@Query('sort') sort?: SortType, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.logService.getAll(limit, offset, sort);
  }
}
