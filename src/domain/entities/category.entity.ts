import { IEntity } from '../interfaces/entity.interface';

export class Category implements IEntity {
  id: number;
  name: string;
  description?: string;

  getId(): number {
    return this.id;
  }
}
