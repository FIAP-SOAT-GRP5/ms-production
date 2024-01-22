/* v8 ignore start */
import { Item } from '../../../enterprise/entities/item.entity';

export interface IQueueGateway {
  send(entity: Item): Promise<void>;
}
/* v8 ignore stop */
