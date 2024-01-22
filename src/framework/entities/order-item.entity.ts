import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IEntity } from './../../domain/application/interfaces/entity.interface';
import { ItemEntity } from './item.entity';
import { OrderEntity } from './order.entity';

@Entity('order_has_item')
export class OrderItemEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  quantity: number;

  @ManyToOne(() => ItemEntity, (item) => item.orderItems)
  @JoinColumn({ name: 'item_id' })
  item: ItemEntity;

  @ManyToOne(() => OrderEntity, (item) => item.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  getId(): number {
    return this.id;
  }
}
