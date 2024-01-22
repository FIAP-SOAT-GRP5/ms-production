import { IEntity } from '../../application/interfaces/entity.interface';
import { Order } from './order.entity';

export class Client implements IEntity {
  id: number;
  email?: string;
  document?: string;
  name?: string;
  orders?: Order[];

  getId(): number {
    return this.id;
  }
}
