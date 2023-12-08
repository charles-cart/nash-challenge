import { Test, TestingModule } from '@nestjs/testing';

import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { FindAllQueryBookDto } from '../dto/find-all-query-book.dto';
import { OrderBooksStub } from '../__mocks__/stubs/books.stub';

jest.mock('../books.service');

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('BooksService.findAll', () => {
    it('should return a order books', async () => {
      const query: FindAllQueryBookDto = new FindAllQueryBookDto();

      const orderBooks = await controller.findAll(query);
      expect(orderBooks).toMatchObject(OrderBooksStub());
    });
  });
});
