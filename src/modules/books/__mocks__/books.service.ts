import { FindAllResponseDto } from '../dto/find-all-response.dto';
import { OrderBooksStub } from './stubs/books.stub';

export class BooksService {
  findAll(): Promise<FindAllResponseDto[]> {
    return Promise.resolve(OrderBooksStub());
  }
}
