/* v8 ignore start */

import { CreateItemDto } from '../../../enterprise/dtos/create-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';

export interface ICreateItemUseCase {
  createItem(item: CreateItemDto): Promise<Item>;
}
/* v8 ignore stop */
