import { ItemGateway } from '../../gateways/item/item.gateway';
import { IItemGateway } from '../../interfaces/item/item.gateway.interface';

import { IItemRepository } from '../../interfaces/item/item-repository.interface';

export const buildItemGateway = (
  itemRepository: IItemRepository,
): IItemGateway => {
  return new ItemGateway(itemRepository);
};
