import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IEntity } from '../../domain/application/interfaces/entity.interface';
import { OrderStatus } from '../../domain/enterprise/value-objects/order-status';

@Entity('order')
export class OrderEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  getId(): number {
    return this.id;
  }
}
