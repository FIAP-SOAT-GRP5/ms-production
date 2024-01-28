import { OrderStatus } from '../value-objects/order-status';

export class OrderToCreateDto {
  id: number;
  status: OrderStatus;
}
