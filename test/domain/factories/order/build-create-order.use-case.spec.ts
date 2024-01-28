import { buildCreateOrderUseCase } from '../../../../src/domain/application/factories/order/create-order.use-case.factory';
import { InMemoryOrderRepository } from '../../../repositories/in-memory-order.repository';

describe('buildCreateOrderUseCase', () => {
  it('should create a class', async () => {
    const inMemoryOrderRepository = new InMemoryOrderRepository();
    const useCase = buildCreateOrderUseCase(inMemoryOrderRepository);
    expect(useCase).toBeDefined();
  });
});
