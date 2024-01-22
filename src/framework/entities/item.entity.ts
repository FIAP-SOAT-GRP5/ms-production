import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IEntity } from '../../domain/application/interfaces/entity.interface';
import { CategoryEntity } from './category.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('item')
export class ItemEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  description?: string;

  @Column({ name: 'category_id' })
  @ApiProperty()
  category_id: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.item)
  orderItems?: OrderItemEntity[];

  getId(): number {
    return this.id;
  }
}
