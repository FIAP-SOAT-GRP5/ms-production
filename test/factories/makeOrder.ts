import { OrderToCreateDto } from '../../src/domain/enterprise/dtos/order-to-create.dto';
import { OrderStatus } from '../../src/domain/enterprise/value-objects/order-status';

export function makeOrderToCreate() {
  const order = new OrderToCreateDto();
  order.status = OrderStatus.PROCESSING;
  return order;
}
