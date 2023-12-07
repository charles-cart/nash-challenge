import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';

import { BooksService } from './books.service';
import { FindAllQueryBookDto } from './dto/find-all-query-book.dto';
import { FindAllResponseDto } from './dto/find-all-response.dto';

@ApiTags('Module Order Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'get order books' })
  @ApiOkResponse({
    description: 'exchange order books',
    type: [FindAllResponseDto],
  })
  findAll(@Query() findAllQueryBookDto: FindAllQueryBookDto): Promise<FindAllResponseDto[]> {
    return this.booksService.findAll(findAllQueryBookDto);
  }
}
