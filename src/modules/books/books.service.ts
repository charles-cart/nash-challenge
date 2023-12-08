import { FindAllQueryBookDto, QueryDto } from './dto/find-all-query-book.dto';
import { Inject, Injectable } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { ConfigExchangeDto } from './dto/config-exchange.dto';
import { ConfigType } from '@nestjs/config';
import { ExchangeType } from '../../common/enum.model';
import { FindAllResponseDto } from './dto/find-all-response.dto';
import { HttpService } from '@nestjs/axios';
import { ObjDto } from './dto/obj.dto';
import { SortType } from '../../common/enum.model';
import _ from 'underscore';
import env from '../../config/environment';

@Injectable()
export class BooksService {
  constructor(
    @Inject(env.KEY) private readonly configService: ConfigType<typeof env>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(findAllQueryBookDto: FindAllQueryBookDto): Promise<FindAllResponseDto[]> {
    const { exchanges } = this.configService;
    const { exchange, ...query } = findAllQueryBookDto;
    const reqs = [];

    for (const key in exchanges) {
      if (exchange === key.toUpperCase() || exchange === ExchangeType.ALL)
        reqs.push(this.createRequest(exchanges[key], query, key.toUpperCase()));
    }

    const promises = reqs.map(({ exchange, promise }) =>
      promise
        .then(({ data }: AxiosResponse) => ({
          exchange,
          status: 'fulfilled',
          data,
        }))
        .catch((reason) => ({ exchange, status: 'rejected', reason })),
    );

    const allPromises = await Promise.allSettled(promises);

    const data = allPromises.reduce(
      (acc: FindAllResponseDto[], result: PromiseFulfilledResult<any>) => {
        if (result.value.status === 'fulfilled') {
          const exchange = result.value.exchange.toLowerCase();
          acc.push(this.extractData(result.value, exchanges[exchange].paths));
        } else console.log(result.value.reason); // TODO: agregar logger pino

        return acc;
      },
      [],
    );

    this.sortBidsAndAsks(data, SortType.DESC, SortType.ASC);

    return data;
  }

  createRequest(
    configExchangeDto: ConfigExchangeDto,
    queryDto: QueryDto,
    exchange: string,
  ): Record<string, Promise<any> | string> {
    const { url, splitter } = configExchangeDto;
    const { limit, baseCoin, quoteCoin } = queryDto;

    const symbol = `${baseCoin}${splitter}${quoteCoin}`;

    return {
      exchange,
      promise: this.httpService.axiosRef.request({
        url,
        params: { limit, symbol },
      }),
    };
  }

  extractData(obj: ObjDto, paths: string[][]): FindAllResponseDto {
    const { exchange } = obj;
    const result: FindAllResponseDto = { exchange, bids: [], asks: [] };

    paths.forEach((path) => {
      result[path[path.length - 1]] = _.get<string[][]>(obj.data, path, [[]]);
    });

    return result;
  }

  sortBidsAndAsks(data: FindAllResponseDto[], bidsOrder: SortType, asksOrder: SortType): void {
    data.forEach((item) => {
      item.bids.sort((a, b) =>
        bidsOrder === SortType.ASC
          ? parseFloat(a[0]) - parseFloat(b[0])
          : parseFloat(b[0]) - parseFloat(a[0]),
      );
      item.asks.sort((a, b) =>
        asksOrder === SortType.ASC
          ? parseFloat(a[0]) - parseFloat(b[0])
          : parseFloat(b[0]) - parseFloat(a[0]),
      );
    });
  }
}
