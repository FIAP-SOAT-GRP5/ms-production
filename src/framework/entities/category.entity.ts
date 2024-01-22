import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEntity } from './../../domain/application/interfaces/entity.interface';

@Entity('category')
export class CategoryEntity implements IEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description?: string;

  getId(): number {
    return this.id;
  }
}
