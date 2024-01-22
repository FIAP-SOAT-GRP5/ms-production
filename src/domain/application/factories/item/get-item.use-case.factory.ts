import { IGetItemUseCase } from '../../interfaces/Item/get-item.use-case.interface';
import { IItemRepository } from '../../interfaces/Item/item-repository.interface';
import { GetItemUseCase } from '../../use-cases/item/get-item.use-case';

export const buildGetItemUseCase = (
  repository: IItemRepository,
): IGetItemUseCase => {
  return new GetItemUseCase(repository);
};
