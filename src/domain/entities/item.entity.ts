import { IEntity } from '../interfaces/entity.interface';
import { Category } from './category.entity';
import { OrderItem } from './order-item.entity';

export class Item implements IEntity {
  id: number;
  name: string;
  price: number;
  description?: string;
  category_id: number;
  category: Category;
  orderItems?: OrderItem[];

  getId(): number {
    return this.id;
  }
}
