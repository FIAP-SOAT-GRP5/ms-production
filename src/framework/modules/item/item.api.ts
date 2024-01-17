import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ItemEntity } from './../../../framework/entities/item.entity';

import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';

import { ItemController } from '../../../domain/controllers/item.controller';
import { ITEM_CONTROLLER } from '../../../domain/symbols/item.symbols';

@ApiTags('Item')
@Controller('item')
export class ItemApi {
  constructor(
    @Inject(ITEM_CONTROLLER)
    private readonly itemController: ItemController,
  ) {}

  @Get('/getItemBySnack')
  public async getItemBySnack(@Res() res: Response): Promise<void> {
    try {
      const item = await this.itemController.getItemBySnack();
      if (!item) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: item });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Get('/getItemByFollowUp')
  public async getItemByFollowUp(@Res() res: Response): Promise<void> {
    try {
      const item = await this.itemController.getItemByFollowUp();
      if (!item) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: item });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Get('/getItemByDrink')
  public async getItemByDrink(@Res() res: Response): Promise<void> {
    try {
      const item = await this.itemController.getItemByDrink();
      if (!item) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: item });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Get('/getItemByDessert')
  public async getItemByDessert(@Res() res: Response): Promise<void> {
    try {
      const item = await this.itemController.getItemByDessert();
      if (!item) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: item });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Get('/:id')
  public async findById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      const item = await this.itemController.findById(id);
      if (!item) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: item });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Post()
  @ApiBody({ type: ItemEntity })
  public async createItem(
    @Res() res: Response,
    @Body() item: CreateItemDto,
  ): Promise<void> {
    try {
      const createItem = await this.itemController.createItem(item);
      if (!createItem) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: createItem });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Put(':id')
  public async updateItem(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() item: UpdateItemDto,
  ): Promise<void> {
    try {
      const createItem = await this.itemController.updateItem(id, item);
      if (!createItem) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: createItem });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Get()
  public async findAll(@Res() res: Response): Promise<void> {
    try {
      const item = await this.itemController.findAll();
      if (!item) {
        res.status(404).send('Items not found');
      } else {
        res.status(200).send({ item: item });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
