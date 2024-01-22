import { IEntity } from '../../application/interfaces/entity.interface';
import { Item } from './item.entity';
import { Order } from './order.entity';

export class OrderItem implements IEntity {
  id: number;
  price: number;
  quantity: number;
  item: Item;
  order: Order;

  getId(): number {
    return this.id;
  }
}
