import { IOrderRepository } from '../../interfaces/order/order-repository.use-case.interface';
import { IUpdateOrderStatusUseCase } from '../../interfaces/order/update-order-status.use-case.interface';
import { UpdateOrderStatusUseCase } from '../../use-cases/order/update-order-status.use-case';
import { IQueueGateway } from '../../interfaces/queue/queue.gateway.interface';

export const buildUpdateOrderStatusUseCase = (
  repository: IOrderRepository,
  updateStatusQueue: IQueueGateway,
): IUpdateOrderStatusUseCase => {
  return new UpdateOrderStatusUseCase(repository, updateStatusQueue);
};
