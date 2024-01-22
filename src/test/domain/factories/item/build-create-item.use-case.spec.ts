import { buildCreateItemUseCase } from '../../../../domain/application/factories/item/create-item.use-case.factory';
import { InMemoryItemRepository } from '../../../repositories/in-memory-item.repository';

let inMemoryItemRepository: InMemoryItemRepository;

describe('buildCreateItemUseCase', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository();
  });

  it('should create a class', async () => {
    const useCase = buildCreateItemUseCase(inMemoryItemRepository);

    expect(useCase).toBeDefined();
  });
});
