import { Before, Given, Then, When } from '@cucumber/cucumber';
import { GetOrderUseCase } from '../../src/domain/application/use-cases/order/get-order.use-case';
import { makeOrderToCreate } from '../factories/makeOrder';
import { InMemoryOrderRepository } from '../repositories/in-memory-order.repository';
import { strictEqual } from 'assert';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: GetOrderUseCase;
let order;

Before(() => {
  inMemoryOrderRepository = new InMemoryOrderRepository();
  sut = new GetOrderUseCase(inMemoryOrderRepository);
});

Given('there are processing orders in the system', async () => {
  await inMemoryOrderRepository.create(makeOrderToCreate());
});

When('I request the list of processing orders', async () => {
  order = await sut.listProcessingOrders();
  return order;
});

Then('I should receive a list of processing orders', () => {
  strictEqual(
    Array.isArray(inMemoryOrderRepository.orders),
    true,
    'Expected order.list to be an array',
  );
  strictEqual(
    inMemoryOrderRepository.orders.length,
    1,
    'Expected order.list to have a length of 1',
  );
});

Given('there are no orders in processing', () => {
  inMemoryOrderRepository.orders = [];
});

When('the user requests the list of processing orders', async () => {
  order = await sut.listProcessingOrders();
  return order;
});

Then('the response should indicate an empty list', async () => {
  strictEqual(
    Array.isArray(inMemoryOrderRepository.orders),
    true,
    'Expected order.list to be an array',
  );
  strictEqual(
    inMemoryOrderRepository.orders.length,
    0,
    'Expected order.list to have a length of 0',
  );
});
