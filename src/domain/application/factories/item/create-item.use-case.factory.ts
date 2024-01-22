import { ICreateItemUseCase } from '../../interfaces/Item/create-item.use-case.interface';
import { IItemRepository } from '../../interfaces/Item/item-repository.interface';
import { CreateItemUseCase } from '../../use-cases/item/create-item.use-case';

export const buildCreateItemUseCase = (
  repository: IItemRepository,
): ICreateItemUseCase => {
  return new CreateItemUseCase(repository);
};
