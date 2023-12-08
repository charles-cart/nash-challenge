const date = '2022-03-15T10:20:30.456Z';

const asks = [
  ['43258.66', '0.02244'],
  ['43258.67', '0.01743'],
];

const bids = [
  ['43258.65', '0.00046'],
  ['43258.64', '0.00312'],
];

const asksSortedDesc = [
  ['43258.67', '0.01743'],
  ['43258.66', '0.02244'],
];

const bidsSortedAsc = [
  ['43258.64', '0.00312'],
  ['43258.65', '0.00046'],
];

export const OrderBooksStub = () => [
  { date, exchange: 'BITMART', asks, bids },
  { date, exchange: 'BINANCE', bids, asks },
];

export const ResponseBitmartStub = () => ({
  code: 1000,
  trace: 'c749335273a64c5b8698e4e2a662d185.55.17020305556678815',
  message: 'success',
  data: {
    ts: '1702030555605',
    symbol: 'BTC_USDT',
    asks,
    bids,
  },
});

export const ResponseBinanceStub = () => ({
  lastUpdateId: 40998100434,
  bids,
  asks,
});

export const dataSortedStub = () => [
  { date, exchange: 'BITMART', asks: asksSortedDesc, bids: bidsSortedAsc },
  { date, exchange: 'BINANCE', bids: bidsSortedAsc, asks: asksSortedDesc },
];

export const dateStub = date;
