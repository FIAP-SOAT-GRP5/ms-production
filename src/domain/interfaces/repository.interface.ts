import { EntityPartial, FindOptionsWhereValue } from '../utils/repository';
import { IEntity } from './entity.interface';

export interface IRepository<E extends IEntity> {
  find(where?: FindOptionsWhereValue<E>): Promise<E[]>;
  findOne(where?: FindOptionsWhereValue<E>): Promise<E>;
  findById(id: number): Promise<E>;
  exists(where?: FindOptionsWhereValue<E>): Promise<boolean>;
  save(data: EntityPartial<E>): Promise<E>;
}
