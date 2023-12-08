import { HttpModule, HttpService } from '@nestjs/axios';
import {
  OrderBooksStub,
  ResponseBinanceStub,
  ResponseBitmartStub,
  dataSortedStub,
} from '../__mocks__/stubs/books.stub';
import { Test, TestingModule } from '@nestjs/testing';

import { BooksService } from '../books.service';
import { ConfigModule } from '@nestjs/config';
import { FindAllQueryBookDto } from '../dto/find-all-query-book.dto';
import { SortType } from '../../../common/enum.model';
import env from '../../../config/environment';

describe('BooksService', () => {
  let service: BooksService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot({ load: [env] })],
      providers: [BooksService],
    })
      .overrideProvider(HttpService.name)
      .useValue({ axiosRef: { request: jest.fn() } })
      .compile();

    service = module.get<BooksService>(BooksService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('BooksService.findAll', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(); // No quiero logs en mis unit test
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should return a order books', async () => {
      const query: FindAllQueryBookDto = new FindAllQueryBookDto();

      query.baseCoin = 'BTC';
      query.quoteCoin = 'USDT';

      jest.spyOn(httpService.axiosRef, 'request').mockImplementation((config) => {
        switch (config.url) {
          case 'https://api-cloud.bitmart.com/spot/quotation/v3/books':
            return Promise.resolve({ data: ResponseBitmartStub() });
          case 'https://api.binance.com/api/v3/depth':
            return Promise.resolve({ data: ResponseBinanceStub() });
          default:
            return Promise.resolve({ data: [] });
        }
      });

      const orderBooks = await service.findAll(query);
      expect(orderBooks).toMatchObject(OrderBooksStub());
    });

    it('should handle bad responses from external api', async () => {
      const query: FindAllQueryBookDto = new FindAllQueryBookDto();
      const orderBooksStub = OrderBooksStub().filter((book) => book.exchange === 'BITMART');

      query.baseCoin = 'BTC';
      query.quoteCoin = 'USDT';

      jest.spyOn(httpService.axiosRef, 'request').mockImplementation((config) => {
        switch (config.url) {
          case 'https://api.binance.com/api/v3/depth':
            return Promise.reject({
              response: { status: 400, data: { code: -1121, msg: 'Invalid symbol.' } },
            });
          default:
            return Promise.resolve({ data: ResponseBitmartStub() });
        }
      });

      const orderBooks = await service.findAll(query);
      expect(orderBooks).toMatchObject(orderBooksStub);
    });
  });

  describe('BooksService.sortBidsAndAsks', () => {
    it('should return sorted bids asc and asks desc', () => {
      const data = OrderBooksStub();
      const dataSorted = dataSortedStub();

      service.sortBidsAndAsks(data, SortType.ASC, SortType.DESC);

      expect(data).toEqual(dataSorted);
    });

    it('should handle empty arrays', () => {
      const data = OrderBooksStub();

      data[0].asks = [];
      data[0].bids = [];

      data[1].asks = [];
      data[1].bids = [];

      service.sortBidsAndAsks(data, SortType.ASC, SortType.DESC);
      expect(data).toEqual(data);
    });
  });
});
