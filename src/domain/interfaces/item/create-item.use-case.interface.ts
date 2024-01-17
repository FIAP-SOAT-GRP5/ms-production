import { CreateItemDto } from 'src/framework/modules/item/dtos/create-item.dto';
import { Item } from '../../entities/item.entity';

export interface ICreateItemUseCase {
  createItem(item: CreateItemDto): Promise<Item>;
}
