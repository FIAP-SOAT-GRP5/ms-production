import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemEntity } from 'src/framework/entities/item.entity';
import { buildCreateItemUseCase } from '../../../domain/factories/item/create-item.use-case.factory';
import { buildGetItemUseCase } from '../../../domain/factories/item/get-item.use-case.factory';
import { buildItemController } from '../../../domain/factories/item/item.controller.factory';
import { buildItemGateway } from '../../../domain/factories/item/item.gateway.factory';
import { buildUpdateItemUseCase } from '../../../domain/factories/item/update-item.use-case.factory';

import { ItemApi } from './item.api';
import { ItemRepository } from './item.repository';
import {
  CREATE_ITEM_USE_CASE,
  GET_ITEM_USE_CASE,
  ITEM_CONTROLLER,
  ITEM_GATEWAY,
  UPDATE_ITEM_USE_CASE,
} from 'src/domain/symbols/item.symbols';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [
    ItemRepository,
    {
      provide: ITEM_CONTROLLER,
      inject: [GET_ITEM_USE_CASE, CREATE_ITEM_USE_CASE, UPDATE_ITEM_USE_CASE],
      useFactory: buildItemController,
    },
    {
      provide: ITEM_GATEWAY,
      inject: [ItemRepository],
      useFactory: buildItemGateway,
    },
    {
      provide: GET_ITEM_USE_CASE,
      inject: [ITEM_GATEWAY],
      useFactory: buildGetItemUseCase,
    },
    {
      provide: CREATE_ITEM_USE_CASE,
      inject: [ITEM_GATEWAY],
      useFactory: buildCreateItemUseCase,
    },
    {
      provide: UPDATE_ITEM_USE_CASE,
      inject: [ITEM_GATEWAY],
      useFactory: buildUpdateItemUseCase,
    },
  ],
  controllers: [ItemApi],
  exports: [GET_ITEM_USE_CASE],
})
export class ItemModule {}
