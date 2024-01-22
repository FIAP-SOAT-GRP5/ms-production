import { IItemRepository } from '../../interfaces/Item/item-repository.interface';
import { IUpdateItemUseCase } from '../../interfaces/Item/update-item.use-case.interface';
import { UpdateItemUseCase } from '../../use-cases/item/update-item.use-case';

export const buildUpdateItemUseCase = (
  repository: IItemRepository,
): IUpdateItemUseCase => {
  return new UpdateItemUseCase(repository);
};
