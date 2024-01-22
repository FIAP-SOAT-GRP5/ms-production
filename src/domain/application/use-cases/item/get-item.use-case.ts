import { Item } from '../../../enterprise/entities/item.entity';
import { IGetItemUseCase } from '../../interfaces/Item/get-item.use-case.interface';
import { IItemRepository } from '../../interfaces/Item/item-repository.interface';

export class GetItemUseCase implements IGetItemUseCase {
  constructor(private readonly repository: IItemRepository) {}
  getItemBySnack(): Promise<Item[]> {
    return this.repository.getItemBySnack();
  }

  getItemByFollowUp(): Promise<Item[]> {
    return this.repository.getItemByFollowUp();
  }

  getItemByDrink(): Promise<Item[]> {
    return this.repository.getItemByDrink();
  }

  getItemByDessert(): Promise<Item[]> {
    return this.repository.getItemByDessert();
  }

  findById(id: number): Promise<Item> {
    return this.repository.findById(id);
  }

  findAll(): Promise<Item[]> {
    return this.repository.findAll();
  }
}
