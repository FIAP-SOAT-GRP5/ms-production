/* v8 ignore start */
import { Order } from '../../../enterprise/entities/order.entity';

export interface IGetOrderUseCase {
  findById(id: number): Promise<Order>;
  listProcessingOrders(): Promise<Order[]>;
}
/* v8 ignore stop */
