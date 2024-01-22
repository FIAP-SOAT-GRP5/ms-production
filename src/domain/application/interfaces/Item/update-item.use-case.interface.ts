/* v8 ignore start */
import { UpdateItemDto } from '../../../enterprise/dtos/update-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';

export interface IUpdateItemUseCase {
  updateItem(id: number, item: UpdateItemDto): Promise<Item>;
}
/* v8 ignore stop */
