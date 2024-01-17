import { IItemGateway } from 'src/domain/interfaces/item/item.gateway.interface';

import { ItemToCreateDto } from '../../dtos/item-to-create.dto';
import { ItemToUpdateDto } from '../../dtos/item-to-update.dto';
import { Item } from '../../entities/item.entity';
// import { IItemRepository } from '../../interfaces/Item/item-repository.interface';
// import { IItemGateway } from '../../interfaces/Item/item.gateway.interface';
import { TypeItem } from '../../value-objects/type-item';

import { IItemRepository } from 'src/domain/interfaces/item/item-repository.interface';

export class ItemGateway implements IItemGateway {
  constructor(private readonly itemRepository: any) {}

  createItem(itemToCreate: ItemToCreateDto) {
    return this.itemRepository.save(itemToCreate);
  }

  updateItem(id: number, itemToUpdate: ItemToUpdateDto) {
    return this.itemRepository.save({
      id,
      ...itemToUpdate,
    });
  }

  getItemBySnack(): Promise<Item[]> {
    return this.itemRepository.find({
      category: {
        id: TypeItem.SNACK,
      },
    });
  }

  getItemByFollowUp(): Promise<Item[]> {
    return this.itemRepository.find({
      category: {
        id: TypeItem.FOLLOW_UP,
      },
    });
  }

  getItemByDrink(): Promise<Item[]> {
    return this.itemRepository.find({
      category: {
        id: TypeItem.DRINK,
      },
    });
  }

  getItemByDessert(): Promise<Item[]> {
    return this.itemRepository.find({
      category: {
        id: TypeItem.DESSERT,
      },
    });
  }

  findById(id: number): Promise<Item> {
    return this.itemRepository.findById(id);
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }
}
