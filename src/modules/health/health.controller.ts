import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { name as app, version } from '../../../package.json';

import { CheckHealthResponse } from './dto/check-health-response.dto';

@ApiTags('Module Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'check API health status' })
  @ApiOkResponse({
    description: 'returns the operational status of the API',
    type: CheckHealthResponse,
  })
  check(): CheckHealthResponse {
    return { app, version };
  }
}
