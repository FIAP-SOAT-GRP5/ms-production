import { OrderStatus } from '../../domain/enterprise/value-objects/order-status';

export class InvalidOrderStatusError extends Error {
  constructor(...status: OrderStatus[]) {
    super(`Order status must be one of the following: ${status.join(', ')}`);
  }
}
