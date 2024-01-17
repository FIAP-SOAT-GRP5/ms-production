import { IEntity } from '../interfaces/entity.interface';

import { OrderStatus } from '../value-objects/order-status';
import { PaymentStatus } from '../value-objects/payment-status';

import { Client } from './client.entity';
import { OrderItem } from './order-item.entity';

export class Order implements IEntity {
  id: number;
  status: OrderStatus;
  status_payment: PaymentStatus;
  finishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  client: Client;
  orderItems?: OrderItem[];

  getId(): number {
    return this.id;
  }
}
