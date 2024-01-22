/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IItemRepository } from '../../../domain/application/interfaces/Item/item-repository.interface';
import { CreateItemDto } from '../../../domain/enterprise/dtos/create-item.dto';
import { UpdateItemDto } from '../../../domain/enterprise/dtos/update-item.dto';
// import { Item } from '../../../domain/enterprise/entities/item.entity';
import { TypeItem } from '../../../domain/enterprise/value-objects/type-item';
import { ItemEntity } from '../../entities/item.entity';

@Injectable()
export class ItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  createItem(item: CreateItemDto): Promise<any> {
    return this.itemRepository.save(item);
  }
  updateItem(idItem: number, itemToUpdate: UpdateItemDto): Promise<any> {
    return this.itemRepository.save({
      idItem,
      ...itemToUpdate,
    });
  }

  getItemBySnack(): Promise<any[]> {
    return this.itemRepository.find({
      where: {
        category: {
          id: TypeItem.SNACK,
        },
      },
    });
  }

  getItemByFollowUp(): Promise<any[]> {
    return this.itemRepository.find({
      where: {
        category: {
          id: TypeItem.FOLLOW_UP,
        },
      },
    });
  }

  getItemByDrink(): Promise<any[]> {
    return this.itemRepository.find({
      where: {
        category: {
          id: TypeItem.DRINK,
        },
      },
    });
  }

  getItemByDessert(): Promise<any[]> {
    return this.itemRepository.find({
      where: {
        category: {
          id: TypeItem.DESSERT,
        },
      },
    });
  }

  findById(id: number): Promise<any> {
    return this.itemRepository.findOne({
      where: {
        id,
      },
    });
  }

  findAll(): Promise<any[]> {
    return this.itemRepository.find();
  }
}
/* v8 ignore stop */
