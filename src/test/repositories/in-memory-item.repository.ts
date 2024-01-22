import { IItemRepository } from '../../domain/application/interfaces/Item/item-repository.interface';
import { Item } from '../../domain/enterprise/entities/item.entity';

export class InMemoryItemRepository implements IItemRepository {
  items: Item[] = [];

  private generateId(): number {
    const findBiggestId = () => {
      let biggestId = 0;
      for (const item of this.items) {
        if (item.getId() > biggestId) {
          biggestId = item.id;
        }
      }
      return biggestId;
    };
    return findBiggestId() + 1;
  }

  async findById(id: number): Promise<Item> {
    return this.items.find((item) => item.id === id);
  }

  async findAll(): Promise<Item[]> {
    return this.items;
  }

  async getItemByDrink(): Promise<Item[]> {
    return this.items.filter((item) => item.category?.id === 3);
  }

  async getItemBySnack(): Promise<Item[]> {
    return this.items.filter((item) => item.category?.id === 1);
  }

  async getItemByDessert(): Promise<Item[]> {
    return this.items.filter((item) => item.category?.id === 4);
  }

  async getItemByFollowUp(): Promise<Item[]> {
    return this.items.filter((item) => item.category?.id === 2);
  }

  async createItem(item: Item): Promise<Item> {
    item.id = this.generateId();
    this.items.push(item);
    return item;
  }

  async updateItem(idItem: number, newItem: Item): Promise<Item> {
    const itemIndex = this.items.findIndex((item) => item.id === idItem);
    if (itemIndex === -1) return undefined;
    this.items[itemIndex] = newItem;
    return newItem;
  }
}
