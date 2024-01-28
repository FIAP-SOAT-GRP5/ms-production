import { GetOrderUseCase } from '../../../../src/domain/application/use-cases/order/get-order.use-case';
import { OrderStatus } from '../../../../src/domain/enterprise/value-objects/order-status';
import { makeOrderToCreate } from '../../../factories/makeOrder';
import { InMemoryOrderRepository } from '../../../repositories/in-memory-order.repository';

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: GetOrderUseCase;

describe('GetOrderUseCase', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new GetOrderUseCase(inMemoryOrderRepository);
  });

  it('should be able to find order by id', async () => {
    const orderToCreate = makeOrderToCreate();
    const order = await inMemoryOrderRepository.create(orderToCreate);

    const response = await sut.findById(order.id);

    expect(response.id).toBeDefined();
  });

  it('should be able to find all orders', async () => {
    const orderToCreate = makeOrderToCreate();
    orderToCreate.status = OrderStatus.PROCESSING;
    await inMemoryOrderRepository.create(orderToCreate);

    const response = await inMemoryOrderRepository.listProcessingOrders();

    expect(response).toHaveLength(1);
  });
});
