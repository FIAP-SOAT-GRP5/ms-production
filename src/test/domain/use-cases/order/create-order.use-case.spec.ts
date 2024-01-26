import { OrderWithoutItemsError } from '../../../../core/errors/order-without-items.error';
import { IQueueGateway } from '../../../../domain/application/interfaces/queue/queue.gateway.interface';
import { CreateOrderUseCase } from '../../../../domain/application/use-cases/order/create-order.use-case';
import { CreateOrderDto } from '../../../../domain/enterprise/dtos/create-order.dto';
import { OrderStatus } from '../../../../domain/enterprise/value-objects/order-status';
import { InMemoryOrderRepository } from '../../../repositories/in-memory-order.repository';

let queueGateway: IQueueGateway;
let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe('CreateOrderUseCase', () => {
  beforeEach(() => {
    queueGateway = {
      send: jest.fn(),
    };
    inMemoryOrderRepository = new InMemoryOrderRepository();
    sut = new CreateOrderUseCase(inMemoryOrderRepository);
  });

  it('should be able to create a order', async () => {
    const dto = new CreateOrderDto();
    dto.status = OrderStatus.AWAITING_PAYMENT;
    dto.id = 1;

    const response = await sut.create(dto);

    expect(response.id).toBeDefined();
    expect(inMemoryOrderRepository.orders).toHaveLength(1);
  });
});
