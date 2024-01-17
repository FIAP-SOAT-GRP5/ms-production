import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ToInt } from '../../../decorators/toint.decorator';
import { ToNumber } from '../../../decorators/tonumber.decorator';

export class CreateItemDto {
  @ApiProperty()
  @ToInt()
  name: string;

  @ApiProperty()
  @ToNumber()
  price: number;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  @ToInt()
  category_id: number;
}
