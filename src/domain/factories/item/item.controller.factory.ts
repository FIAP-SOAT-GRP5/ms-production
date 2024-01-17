import { IGetItemUseCase } from '../../interfaces/item/get-item.use-case.interface';
import { ItemController } from '../../controllers/item.controller';
import { ICreateItemUseCase } from '../../interfaces/item/create-item.use-case.interface';
import { IUpdateItemUseCase } from '../../interfaces/item/update-item.use-case.interface';

export const buildItemController = (
  getItemUseCase: IGetItemUseCase,
  createItemUseCase: ICreateItemUseCase,
  updateItemUseCase: IUpdateItemUseCase,
): ItemController => {
  return new ItemController(
    getItemUseCase,
    createItemUseCase,
    updateItemUseCase,
  );
};
