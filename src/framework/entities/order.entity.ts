import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IEntity } from '../../domain/interfaces/entity.interface';
import { OrderStatus } from '../../domain/value-objects/order-status';
import { PaymentStatus } from '../../domain/value-objects/payment-status';
import { ClientEntity } from './client.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('order')
export class OrderEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  status: OrderStatus;

  @Column()
  @ApiProperty()
  status_payment: PaymentStatus;

  @Column()
  @ApiProperty()
  finishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ClientEntity, (item) => item.orders)
  client: ClientEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: true,
    persistence: true,
  })
  orderItems?: OrderItemEntity[];

  getId(): number {
    return this.id;
  }
}
