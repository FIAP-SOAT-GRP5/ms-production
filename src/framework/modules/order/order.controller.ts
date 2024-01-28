import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  GET_ORDER_USE_CASE,
  UPDATE_ORDER_STATUS_USE_CASE,
} from '../../../domain/application/symbols/order.symbols';
import { IGetOrderUseCase } from '../../../domain/application/interfaces/order/get-order.use-case.interface';
import { OrderNotFoundError } from '../../../core/errors/order-not-found.error';
import { InvalidOrderStatusError } from '../../../core/errors/invalid-order-status.error';
import { IUpdateOrderStatusUseCase } from '../../../domain/application/interfaces/order/update-order-status.use-case.interface';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(
    @Inject(GET_ORDER_USE_CASE)
    private readonly getOrderUseCase: IGetOrderUseCase,
    @Inject(UPDATE_ORDER_STATUS_USE_CASE)
    private readonly updateOrderStatusUseCase: IUpdateOrderStatusUseCase,
  ) {}

  @Get('list-processing-orders')
  public async listProcessingOrders(@Res() res: Response): Promise<void> {
    try {
      const list = await this.getOrderUseCase.listProcessingOrders();
      res.status(200).send({ list });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  @Put(':id/status/processing')
  // @AuthJwt()
  public async updateStatusProcessing(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      const order = await this.updateOrderStatusUseCase.updateStatusProcessing(
        id,
      );
      res.status(200).send({ order });
    } catch (error) {
      if (error instanceof OrderNotFoundError) {
        res.status(404).send(error.message);
      } else if (error instanceof InvalidOrderStatusError) {
        res.status(409).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  }

  @Put(':id/status/ready')
  // @AuthJwt()
  public async updateStatusReady(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      const order = await this.updateOrderStatusUseCase.updateStatusReady(id);
      res.status(200).send({ order });
    } catch (error) {
      if (error instanceof OrderNotFoundError) {
        res.status(404).send(error.message);
      } else if (error instanceof InvalidOrderStatusError) {
        res.status(409).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  }

  @Put(':id/status/finished')
  // @AuthJwt()
  public async updateStatusFinished(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      const order = await this.updateOrderStatusUseCase.updateStatusFinished(
        id,
      );
      res.status(200).send({ order });
    } catch (error) {
      if (error instanceof OrderNotFoundError) {
        res.status(404).send(error.message);
      } else if (error instanceof InvalidOrderStatusError) {
        res.status(409).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    }
  }
}
