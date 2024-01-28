import { buildUpdateOrderStatusUseCase } from '../../../../src/domain/application/factories/order/update-order-status.use-case.factory';
import { IOrderRepository } from '../../../../src/domain/application/interfaces/order/order-repository.use-case.interface';
import { IQueueGateway } from '../../../../src/domain/application/interfaces/queue/queue.gateway.interface';

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
