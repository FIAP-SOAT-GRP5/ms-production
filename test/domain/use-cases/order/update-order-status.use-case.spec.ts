import { IQueueGateway } from '../../../../src/domain/application/interfaces/queue/queue.gateway.interface';
import { CreateOrderDto } from '../../../../src/domain/enterprise/dtos/create-order.dto';
import { OrderStatus } from '../../../../src/domain/enterprise/value-objects/order-status';
import { InMemoryOrderRepository } from '../../../repositories/in-memory-order.repository';

let queueGateway: IQueueGateway;
let inMemoryOrderRepository: InMemoryOrderRepository;

describe('UpdateOrderStatusUseCase', () => {
  beforeEach(() => {
    queueGateway = {
      send: vi.fn(),
    };

    inMemoryOrderRepository = new InMemoryOrderRepository();
  });

  it('should be able to update a order', async () => {
    const dto = new CreateOrderDto();
    dto.id = 1;
    dto.status = OrderStatus.AWAITING_PAYMENT;

    const order = await inMemoryOrderRepository.create(dto);

    const orderUpdate = await inMemoryOrderRepository.updateStatusReceived(
      order.id,
    );

    expect(orderUpdate.id).toBeDefined();
    expect(orderUpdate.status).toBe(OrderStatus.RECEIVED);
  });

  it('It should not be possible to update an item with status awaiting payment for processing', async () => {
    const dto = new CreateOrderDto();
    dto.id = 1;
    dto.status = OrderStatus.AWAITING_PAYMENT;

    const order = await inMemoryOrderRepository.create(dto);

    const orderUpdate = await inMemoryOrderRepository.updateStatusProcessing(
      order.id,
    );

    expect(orderUpdate.status).not.toBe(OrderStatus.PROCESSING);
  });
});
