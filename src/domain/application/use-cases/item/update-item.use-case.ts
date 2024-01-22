import { UpdateItemDto } from '../../../enterprise/dtos/update-item.dto';
import { Item } from '../../../enterprise/entities/item.entity';
import { IItemRepository } from '../../interfaces/Item/item-repository.interface';
import { IUpdateItemUseCase } from '../../interfaces/Item/update-item.use-case.interface';

export class UpdateItemUseCase implements IUpdateItemUseCase {
  constructor(private readonly repository: IItemRepository) {}
  updateItem(id: number, item: UpdateItemDto): Promise<Item> {
    return this.repository.updateItem(id, item);
  }
}
