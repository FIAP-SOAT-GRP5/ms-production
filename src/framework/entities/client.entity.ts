import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IEntity } from '../../domain/interfaces/entity.interface';
import { OrderEntity } from './order.entity';

@Entity('client')
export class ClientEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  email?: string;

  @Column()
  @ApiProperty()
  document?: string;

  @Column()
  @ApiProperty()
  name?: string;

  @OneToMany(() => OrderEntity, (item) => item.client)
  orders?: OrderEntity[];

  getId(): number {
    return this.id;
  }
}
