import { buildGetOrderUseCase } from '../../../../src/domain/application/factories/order/get-order.use-case.factory';
import { InMemoryOrderRepository } from '../../../repositories/in-memory-order.repository';

let inMemoryOrderRepository: InMemoryOrderRepository;

describe('buildGetOrderUseCase', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
  });

  it('should create a class', async () => {
    const useCase = buildGetOrderUseCase(inMemoryOrderRepository);

    expect(useCase).toBeDefined();
  });
});
