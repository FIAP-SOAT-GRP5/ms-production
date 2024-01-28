import { IEntity } from '../../application/interfaces/entity.interface';
import { OrderStatus } from '../value-objects/order-status';

export class Order implements IEntity {
  id: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  getId(): number {
    return this.id;
  }
}
