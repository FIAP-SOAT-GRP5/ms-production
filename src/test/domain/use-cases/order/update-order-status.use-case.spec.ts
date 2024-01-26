import { IQueueGateway } from '../../../../domain/application/interfaces/queue/queue.gateway.interface';
import { OrderStatus } from '../../../../domain/enterprise/value-objects/order-status';
import { CreateOrderDto } from '../../../../domain/enterprise/dtos/create-order.dto';

import { InMemoryOrderRepository } from '../../../repositories/in-memory-order.repository';

let queueGateway: IQueueGateway;
let inMemoryOrderRepository: InMemoryOrderRepository;

describe('UpdateOrderStatusUseCase', () => {
  beforeEach(() => {
    queueGateway = {
      send: jest.fn(),
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
