import { Test, TestingModule } from '@nestjs/testing';

import { Response } from 'express';
import { ItemApi } from '../item.api';

import { ItemController } from '../../../../domain/controllers/item.controller';
import { ITEM_CONTROLLER } from '../../../../domain/symbols/item.symbols';

describe('ItemApi', () => {
  let itemApi: ItemApi;
  let itemController: ItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemApi],
      providers: [
        {
          provide: ITEM_CONTROLLER,
          useValue: {},
        },
      ],
    }).compile();

    itemApi = module.get<ItemApi>(ItemApi);
    itemController = module.get<ItemController>(ITEM_CONTROLLER);
  });

  it('should be defined', () => {
    expect(itemApi).toBeDefined();
  });
});
