import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  env: process.env.NODE_ENV || 'development',
  exchanges: {
    bitmart: {
      url: process.env.BITMART_BASE_URL,
      splitter: process.env.BITMART_SPLITTER,
      paths: JSON.parse(process.env.BITMART_PATHS) as string[][],
    },
    binance: {
      url: process.env.BINANCE_BASE_URL,
      splitter: process.env.BINANCE_SPLITTER,
      paths: JSON.parse(process.env.BINANCE_PATHS) as string[][],
    },
  },
}));
