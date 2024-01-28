import { IGetOrderUseCase } from '../../interfaces/order/get-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.use-case.interface';
import { GetOrderUseCase } from '../../use-cases/order/get-order.use-case';

export const buildGetOrderUseCase = (
  repository: IOrderRepository,
): IGetOrderUseCase => {
  return new GetOrderUseCase(repository);
};
