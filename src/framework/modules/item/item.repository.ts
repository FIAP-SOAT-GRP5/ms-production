import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Item } from '../../../domain/entities/item.entity';
import { IItemRepository } from '../../../domain/interfaces/item/item-repository.interface';
import {
  EntityPartial,
  FindOptionsWhereValue,
} from '../../../domain/utils/repository';
import { ItemEntity } from '../../../framework/entities/item.entity';

@Injectable()
export class ItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  exists(where?: FindOptionsWhereValue<Item>): Promise<boolean> {
    return this.itemRepository.exist({ where });
  }

  find(where?: FindOptionsWhereValue<Item>): Promise<Item[]> {
    return this.itemRepository.find({
      where,
    });
  }

  findOne(where?: FindOptionsWhereValue<Item>): Promise<Item> {
    return this.itemRepository.findOne({
      where,
    });
  }

  findById(id: number): Promise<Item> {
    return this.itemRepository.findOne({
      where: {
        id,
      },
    });
  }

  save(data: EntityPartial<Item>): Promise<Item> {
    return this.itemRepository.save(data);
  }
}
