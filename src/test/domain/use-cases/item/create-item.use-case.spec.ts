import { CreateItemUseCase } from '../../../../domain/application/use-cases/item/create-item.use-case';
import { CreateItemDto } from '../../../../domain/enterprise/dtos/create-item.dto';
import { makeDrinkCategory } from '../../../factories/makeCategory';
import { InMemoryItemRepository } from '../../../repositories/in-memory-item.repository';

let inMemoryItemRepository: InMemoryItemRepository;
let sut: CreateItemUseCase;

describe('CreateItemUseCase', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository();
    sut = new CreateItemUseCase(inMemoryItemRepository);
  });

  it('should be able to create a item', async () => {
    const drinkCategory = makeDrinkCategory();

    const dto = new CreateItemDto();
    dto.category_id = drinkCategory.id;
    dto.name = 'Coca-Cola';
    dto.price = 5.0;

    const response = await sut.createItem(dto);

    expect(response.id).toBeDefined();
    expect(inMemoryItemRepository.items).toHaveLength(1);
  });
});
