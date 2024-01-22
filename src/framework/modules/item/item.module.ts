/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/framework/entities/item.entity';
import { buildCreateItemUseCase } from '../../../domain/application/factories/item/create-item.use-case.factory';
import { buildGetItemUseCase } from '../../../domain/application/factories/item/get-item.use-case.factory';
import { buildUpdateItemUseCase } from '../../../domain/application/factories/item/update-item.use-case.factory';
import {
  CREATE_ITEM_USE_CASE,
  GET_ITEM_USE_CASE,
  UPDATE_ITEM_USE_CASE,
} from '../../../domain/application/symbols/item.symbols';
import { ItemController } from './item.controller';
import { ItemRepository } from './item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [
    ItemRepository,
    {
      provide: GET_ITEM_USE_CASE,
      inject: [ItemRepository],
      useFactory: buildGetItemUseCase,
    },
    {
      provide: CREATE_ITEM_USE_CASE,
      inject: [ItemRepository],
      useFactory: buildCreateItemUseCase,
    },
    {
      provide: UPDATE_ITEM_USE_CASE,
      inject: [ItemRepository],
      useFactory: buildUpdateItemUseCase,
    },
  ],
  controllers: [ItemController],
  exports: [GET_ITEM_USE_CASE],
})
export class ItemModule {}
/* v8 ignore stop */
