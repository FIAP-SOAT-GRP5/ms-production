import { IQueueGateway } from '../../../../src/domain/application/interfaces/queue/queue.gateway.interface';
import { CreateOrderUseCase } from '../../../../src/domain/application/use-cases/order/create-order.use-case';
import { CreateOrderDto } from '../../../../src/domain/enterprise/dtos/create-order.dto';
import { OrderStatus } from '../../../../src/domain/enterprise/value-objects/order-status';
import { InMemoryOrderRepository } from '../../../repositories/in-memory-order.repository';

let queueGateway: IQueueGateway;
let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: CreateOrderUseCase;

describe('CreateOrderUseCase', () => {
  beforeEach(() => {
    queueGateway = {
      send: vi.fn(),
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
