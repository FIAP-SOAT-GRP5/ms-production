import { IGetItemUseCase } from '../../interfaces/item/get-item.use-case.interface';
import { IItemGateway } from '../../interfaces/item/item.gateway.interface';
import { GetItemUseCase } from '../../use-cases/item/get-item.use-case';

export const buildGetItemUseCase = (
  repository: IItemGateway,
): IGetItemUseCase => {
  return new GetItemUseCase(repository);
};
