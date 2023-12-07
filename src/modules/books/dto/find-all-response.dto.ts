import { ApiProperty } from '@nestjs/swagger';

export class FindAllResponseDto {
  @ApiProperty()
  exchange: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'array', example: ['string', 'string'], items: { type: 'string' } },
  })
  asks: string[][];

  @ApiProperty({
    type: 'array',
    items: { type: 'array', example: ['string', 'string'], items: { type: 'string' } },
  })
  bids: string[][];
}
