import { Item } from '../../entities/item.entity';

export interface IGetItemUseCase {
  findById(id: number): Promise<Item>;
  findAll(): Promise<Item[]>;
  getItemBySnack(): Promise<Item[]>;
  getItemByFollowUp(): Promise<Item[]>;
  getItemByDrink(): Promise<Item[]>;
  getItemByDessert(): Promise<Item[]>;
}
