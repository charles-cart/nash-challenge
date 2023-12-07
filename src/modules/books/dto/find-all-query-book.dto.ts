import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ExchangeType, LimitType } from '../../../common/enum.model';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { ToUpperCase, Trim } from '../../../common/helpers/custom.validators';

export class FindAllQueryBookDto {
  @ApiProperty({ enum: ExchangeType, default: ExchangeType.ALL })
  @IsOptional()
  @Trim()
  @ToUpperCase()
  @IsEnum(ExchangeType)
  exchange: ExchangeType = ExchangeType.ALL;

  @ApiProperty({ example: 'btc' })
  @IsNotEmpty()
  @Trim()
  @ToUpperCase()
  @IsString()
  baseCoin: string;

  @ApiProperty({ example: 'usdt' })
  @IsNotEmpty()
  @Trim()
  @ToUpperCase()
  @IsString()
  quoteCoin: string;

  @ApiProperty({ default: LimitType.DEFAULT })
  @IsOptional()
  @IsInt()
  @Min(LimitType.MIN)
  @Max(LimitType.MAX)
  limit: number = LimitType.DEFAULT;
}

export class QueryDto extends OmitType(FindAllQueryBookDto, ['exchange'] as const) {}
