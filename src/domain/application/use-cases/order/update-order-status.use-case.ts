import { OrderStatus } from '../../../../domain/enterprise/value-objects/order-status';
import { IUpdateOrderStatusUseCase } from '../../interfaces/order/update-order-status.use-case.interface';
import { InvalidOrderStatusError } from '../../../../core/errors/invalid-order-status.error';
import { OrderNotFoundError } from '../../../../core/errors/order-not-found.error';
import { Order } from '../../../../domain/enterprise/entities/order.entity';
import { IOrderRepository } from '../../interfaces/order/order-repository.use-case.interface';
import { IQueueGateway } from '../../interfaces/queue/queue.gateway.interface';

export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {
  constructor(
    private readonly repository: IOrderRepository,
    private readonly updateStatusQueue: IQueueGateway,
  ) {}

  private async validateOrderAndStatus(
    id: number,
    ...status: OrderStatus[]
  ): Promise<void> {
    const order = await this.repository.findById(id);
    if (!order) throw new OrderNotFoundError();
    if (!status.includes(order.status))
      throw new InvalidOrderStatusError(...status);
  }

  async updateStatusProcessing(id: number): Promise<Order> {
    await this.validateOrderAndStatus(id, OrderStatus.RECEIVED);
    await this.repository.updateStatus(id, OrderStatus.PROCESSING);
    const order = await this.repository.findById(id);
    await this.updateStatusQueue.send(order);
    return order;
  }

  async updateStatusReady(id: number): Promise<Order> {
    await this.validateOrderAndStatus(id, OrderStatus.PROCESSING);
    await this.repository.updateStatus(id, OrderStatus.READY);
    const order = await this.repository.findById(id);
    await this.updateStatusQueue.send(order);
    return order;
  }

  async updateStatusFinished(id: number): Promise<Order> {
    await this.validateOrderAndStatus(id, OrderStatus.READY);
    await this.repository.updateStatus(id, OrderStatus.FINISHED);
    const order = await this.repository.findById(id);
    await this.updateStatusQueue.send(order);
    return order;
  }

  async updateStatusReceived(id: number): Promise<Order> {
    await this.validateOrderAndStatus(id, OrderStatus.AWAITING_PAYMENT);
    await this.repository.updateStatus(id, OrderStatus.RECEIVED);
    const order = await this.repository.findById(id);
    await this.updateStatusQueue.send(order);
    return order;
  }
}
