import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ToInt } from '../../../decorators/toint.decorator';

class ItemDto {
  @ApiProperty()
  @ToInt()
  id: number;
  @ApiProperty()
  @ToInt()
  quantity: number;
}

export class CreateOrderBodyDto {
  @ApiProperty({ type: ItemDto, isArray: true, nullable: false })
  @IsArray()
  itemsIds: ItemDto[];
}
