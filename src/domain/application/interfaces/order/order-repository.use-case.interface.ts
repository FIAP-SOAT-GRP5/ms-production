/* v8 ignore start */
import { OrderStatus } from '../../../../domain/enterprise/value-objects/order-status';
import { OrderToCreateDto } from '../../../enterprise/dtos/order-to-create.dto';
import { Order } from '../../../enterprise/entities/order.entity';

export interface IOrderRepository {
  findById(id: number): Promise<Order>;
  create(orderToCreate: OrderToCreateDto): Promise<Order>;
  updateStatus(id: number, status: OrderStatus): Promise<boolean>;
  listProcessingOrders(): Promise<Order[]>;

  // updateStatusReceived(id: number): Promise<Order>;
  // updateStatusProcessing(id: number): Promise<Order>;
  // updateStatusReady(id: number): Promise<Order>;
  // updateStatusFinished(id: number): Promise<Order>;
}
/* v8 ignore stop */
