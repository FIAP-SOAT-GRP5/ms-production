import { UpdateItemDto } from '../../../framework/modules/item/dtos/update-item.dto';
import { Item } from '../../entities/item.entity';

import { IItemGateway } from '../../interfaces/item/item.gateway.interface';
import { IUpdateItemUseCase } from '../../../domain/interfaces/item/update-item.use-case.interface';

export class UpdateItemUseCase implements IUpdateItemUseCase {
  constructor(private readonly itemGateway: IItemGateway) {}
  updateItem(idItem: number, item: UpdateItemDto): Promise<Item> {
    return this.itemGateway.updateItem(idItem, item);
  }
}
