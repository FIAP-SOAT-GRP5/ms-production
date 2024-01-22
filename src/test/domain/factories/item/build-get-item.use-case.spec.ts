import { buildGetItemUseCase } from '../../../../domain/application/factories/item/get-item.use-case.factory';
import { InMemoryItemRepository } from '../../../repositories/in-memory-item.repository';

let inMemoryItemRepository: InMemoryItemRepository;

describe('buildGetItemUseCase', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository();
  });

  it('should create a class', async () => {
    const useCase = buildGetItemUseCase(inMemoryItemRepository);

    expect(useCase).toBeDefined();
  });
});
