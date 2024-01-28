import { OrderStatus } from '../value-objects/order-status';

export class CreateOrderDto {
  id: number;
  status: OrderStatus;
}
