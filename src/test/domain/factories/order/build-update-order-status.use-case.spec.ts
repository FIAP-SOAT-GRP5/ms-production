import { buildUpdateOrderStatusUseCase } from '../../../../domain/application/factories/order/update-order-status.use-case.factory';
import { IQueueGateway } from '../../../../domain/application/interfaces/queue/queue.gateway.interface';
import { IOrderRepository } from '../../../../domain/application/interfaces/order/order-repository.use-case.interface';

let repository: IOrderRepository;
let updateStatusQueue: IQueueGateway;

describe('buildGetOrderUseCase', () => {
  it('should create a class', async () => {
    const useCase = buildUpdateOrderStatusUseCase(
      repository,
      updateStatusQueue,
    );

    expect(useCase).toBeDefined();
  });
});
