import { Item } from '../../domain/enterprise/entities/item.entity';

export function makeItem() {
  const item = new Item();
  item.name = 'Bebida';
  item.price = 5.0;
  return item;
}
