import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.use-case.interface';
import { CreateOrderUseCase } from '../../use-cases/order/create-order.use-case';

export const buildCreateOrderUseCase = (
  repository: IOrderRepository,
): ICreateOrderUseCase => {
  return new CreateOrderUseCase(repository);
};
