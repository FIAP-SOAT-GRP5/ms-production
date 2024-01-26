import { OrderStatus } from '../value-objects/order-status';

class ItemDto {
  id: number;
  quantity: number;
}

export class CreateOrderDto {
  id: number;
  status: OrderStatus;
}
