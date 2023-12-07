import { ApiProperty } from '@nestjs/swagger';

export class CheckHealthResponse {
  @ApiProperty()
  app: string;

  @ApiProperty()
  version: string;
}
