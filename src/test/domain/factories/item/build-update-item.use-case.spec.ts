import { buildUpdateItemUseCase } from '../../../../domain/application/factories/item/update-item.use-case.factory';
import { InMemoryItemRepository } from '../../../repositories/in-memory-item.repository';

let inMemoryItemRepository: InMemoryItemRepository;

describe('buildUpdateItemUseCase', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository();
  });

  it('should create a class', async () => {
    const useCase = buildUpdateItemUseCase(inMemoryItemRepository);

    expect(useCase).toBeDefined();
  });
});
