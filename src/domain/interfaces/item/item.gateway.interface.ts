import { ItemToCreateDto } from '../../dtos/item-to-create.dto';
import { ItemToUpdateDto } from '../../dtos/item-to-update.dto';
import { Item } from '../../entities/item.entity';

export interface IItemGateway {
  findById(id: number): Promise<Item>;
  findAll(): Promise<Item[]>;

  getItemByDrink(): Promise<Item[]>;
  getItemBySnack(): Promise<Item[]>;
  getItemByDessert(): Promise<Item[]>;
  getItemByFollowUp(): Promise<Item[]>;

  createItem(item: ItemToCreateDto): Promise<Item>;
  updateItem(idItem: number, item: ItemToUpdateDto): Promise<Item>;
}
