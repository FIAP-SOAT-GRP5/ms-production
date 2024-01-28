import { OrderStatus } from '../../src/domain/enterprise/value-objects/order-status';
import { IOrderRepository } from '../../src/domain/application/interfaces/order/order-repository.use-case.interface';
import { OrderToCreateDto } from '../../src/domain/enterprise/dtos/order-to-create.dto';
import { Order } from '../../src/domain/enterprise/entities/order.entity';

export class InMemoryOrderRepository implements IOrderRepository {
  orders: Order[] = [];

  private generateId(): number {
    const findBiggestId = () => {
      let biggestId = 0;
      for (const order of this.orders) {
        if (order.getId() > biggestId) {
          biggestId = order.id;
        }
      }
      return biggestId;
    };
    return findBiggestId() + 1;
  }

  async update(id: number): Promise<void> {
    const orderToUpdate = await this.findById(id);
    orderToUpdate.status = OrderStatus.RECEIVED;
    if (!orderToUpdate) return;
  }

  async create(orderToCreate: OrderToCreateDto): Promise<Order> {
    const order = new Order();
    order.id = this.generateId();
    order.status = orderToCreate.status;

    this.orders.push(order);
    return order;
  }

  async findById(id: number): Promise<Order> {
    const order = await this.orders.find((o) => o.id === id);
    return order;
  }

  async listAllOrders(): Promise<Order[]> {
    return this.orders;
  }

  async updateStatus(id: number, status: OrderStatus): Promise<boolean> {
    const orderToUpdate = await this.findById(id);
    if (!orderToUpdate) return false;
    orderToUpdate.status = status;

    return true;
  }

  async listProcessingOrders(): Promise<Order[]> {
    return this.orders.filter((item) => item.status === OrderStatus.PROCESSING);
  }

  async updateStatusReceived(id: number): Promise<Order> {
    const orderToUpdate = await this.findById(id);
    if (orderToUpdate.status !== OrderStatus.AWAITING_PAYMENT)
      return orderToUpdate;

    orderToUpdate.status = OrderStatus.RECEIVED;
    if (!orderToUpdate) return;

    return orderToUpdate;
  }

  async updateStatusProcessing(id: number): Promise<Order> {
    const orderToUpdate = await this.findById(id);
    if (orderToUpdate.status !== OrderStatus.RECEIVED) return orderToUpdate;

    orderToUpdate.status = OrderStatus.PROCESSING;
    if (!orderToUpdate) return;

    return orderToUpdate;
  }

  async updateStatusReady(id: number): Promise<Order> {
    const orderToUpdate = await this.findById(id);
    if (orderToUpdate.status !== OrderStatus.PROCESSING) return orderToUpdate;

    orderToUpdate.status = OrderStatus.READY;
    if (!orderToUpdate) return;

    return orderToUpdate;
  }

  async updateStatusFinished(id: number): Promise<Order> {
    const orderToUpdate = await this.findById(id);
    if (orderToUpdate.status !== OrderStatus.READY) return orderToUpdate;

    orderToUpdate.status = OrderStatus.FINISHED;
    if (!orderToUpdate) return;

    return orderToUpdate;
  }
}
