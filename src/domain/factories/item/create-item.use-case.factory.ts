import { IItemGateway } from '../../interfaces/item/item.gateway.interface';
import { ICreateItemUseCase } from '../../interfaces/item/create-item.use-case.interface';

import { CreateItemUseCase } from 'src/domain/use-cases/item/create-item.use-case';

export const buildCreateItemUseCase = (
  repository: IItemGateway,
): ICreateItemUseCase => {
  return new CreateItemUseCase(repository);
};
