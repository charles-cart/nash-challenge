import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
