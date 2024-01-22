import { CreateItemDto } from '../../../enterprise/dtos/create-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';
import { ICreateItemUseCase } from '../../interfaces/Item/create-item.use-case.interface';
import { IItemRepository } from '../../interfaces/Item/item-repository.interface';

export class CreateItemUseCase implements ICreateItemUseCase {
  constructor(private readonly repository: IItemRepository) {}
  createItem(item: CreateItemDto): Promise<Item> {
    return this.repository.createItem(item);
  }
}
