/* v8 ignore start */
import { CreateItemDto } from '../../../enterprise/dtos/create-item.dto';
import { UpdateItemDto } from '../../../enterprise/dtos/update-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';

export interface IItemRepository {
  findById(id: number): Promise<Item>;
  findAll(): Promise<Item[]>;

  getItemByDrink(): Promise<Item[]>;
  getItemBySnack(): Promise<Item[]>;
  getItemByDessert(): Promise<Item[]>;
  getItemByFollowUp(): Promise<Item[]>;

  createItem(item: CreateItemDto): Promise<Item>;
  updateItem(idItem: number, item: UpdateItemDto): Promise<Item>;
}
/* v8 ignore stop */
