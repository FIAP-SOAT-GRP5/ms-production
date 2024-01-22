import { GetItemUseCase } from '../../../../domain/application/use-cases/item/get-item.use-case';
import {
  makeDessertCategory,
  makeDrinkCategory,
  makeFollowUpCategory,
  makeSnackCategory,
} from '../../../factories/makeCategory';
import { makeItem } from '../../../factories/makeItem';
import { InMemoryItemRepository } from '../../../repositories/in-memory-item.repository';

let inMemoryItemRepository: InMemoryItemRepository;
let sut: GetItemUseCase;

describe('GetItemUseCase', () => {
  beforeEach(() => {
    inMemoryItemRepository = new InMemoryItemRepository();
    sut = new GetItemUseCase(inMemoryItemRepository);
  });

  it('should be able to find item by id', async () => {
    const item = makeItem();
    await inMemoryItemRepository.createItem(item);

    const response = await sut.findById(item.id);

    expect(response.id).toBeDefined();
  });

  it('should be able to find all items', async () => {
    const item = makeItem();
    await inMemoryItemRepository.createItem(item);

    const response = await sut.findAll();

    expect(response).toHaveLength(1);
  });

  it('should be able to find item by drink', async () => {
    const item = makeItem();
    const category = makeDrinkCategory();
    item.category = category;
    await inMemoryItemRepository.createItem(item);

    const response = await sut.getItemByDrink();

    expect(response).toHaveLength(1);
  });

  it('should be able to find item by snack', async () => {
    const item = makeItem();
    const category = makeSnackCategory();
    item.category = category;
    await inMemoryItemRepository.createItem(item);

    const response = await sut.getItemBySnack();

    expect(response).toHaveLength(1);
  });

  it('should be able to find item by dessert', async () => {
    const item = makeItem();
    const category = makeDessertCategory();
    item.category = category;
    await inMemoryItemRepository.createItem(item);

    const response = await sut.getItemByDessert();

    expect(response).toHaveLength(1);
  });

  it('should be able to find item by follow up', async () => {
    const item = makeItem();
    const category = makeFollowUpCategory();
    item.category = category;
    await inMemoryItemRepository.createItem(item);

    const response = await sut.getItemByFollowUp();

    expect(response).toHaveLength(1);
  });
});
