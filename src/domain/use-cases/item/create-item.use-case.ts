import { CreateItemDto } from 'src/framework/modules/item/dtos/create-item.dto';
import { Item } from '../../entities/item.entity';
import { ICreateItemUseCase } from '../../interfaces/item/create-item.use-case.interface';
import { IItemGateway } from '../../interfaces/item/item.gateway.interface';

export class CreateItemUseCase implements ICreateItemUseCase {
  constructor(private readonly itemGateway: IItemGateway) {}
  createItem(item: CreateItemDto): Promise<Item> {
    return this.itemGateway.createItem(item);
  }
}
