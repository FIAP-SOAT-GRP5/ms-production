/* v8 ignore start */
import { Order } from '../../../enterprise/entities/order.entity';

export interface IQueueGateway {
  send(entity: Order): Promise<void>;
}
/* v8 ignore stop */
