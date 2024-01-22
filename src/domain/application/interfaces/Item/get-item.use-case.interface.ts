/* v8 ignore start */
import { Item } from '../../../enterprise/entities/item.entity';

export interface IGetItemUseCase {
  findById(id: number): Promise<Item>;
  findAll(): Promise<Item[]>;
  getItemBySnack(): Promise<Item[]>;
  getItemByFollowUp(): Promise<Item[]>;
  getItemByDrink(): Promise<Item[]>;
  getItemByDessert(): Promise<Item[]>;
}
/* v8 ignore stop */
