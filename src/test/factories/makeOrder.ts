import { OrderToCreateDto } from '../../domain/enterprise/dtos/order-to-create.dto';

export function makeOrderToCreate() {
  const order = new OrderToCreateDto();
  return order;
}
