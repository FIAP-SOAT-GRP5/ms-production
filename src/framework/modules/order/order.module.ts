/* v8 ignore start */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildCreateOrderUseCase } from '../../../domain/application/factories/order/create-order.use-case.factory';
import { buildGetOrderUseCase } from '../../../domain/application/factories/order/get-order.use-case.factory';
import {
  CREATE_ORDER_USE_CASE,
  GET_ORDER_USE_CASE,
  UPDATE_ORDER_STATUS_USE_CASE,
} from '../../../domain/application/symbols/order.symbols';
import { OrderEntity } from '../../entities/order.entity';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { buildUpdateOrderStatusUseCase } from '../../../domain/application/factories/order/update-order-status.use-case.factory';
import { CreateOrderQueueGateway } from './create-order-queue.gateway';
import { UpdateOrderQueueGateway } from './update-order-queue.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [
    OrderRepository,
    CreateOrderQueueGateway,
    UpdateOrderQueueGateway,
    {
      provide: CREATE_ORDER_USE_CASE,
      inject: [OrderRepository],
      useFactory: buildCreateOrderUseCase,
    },
    {
      provide: GET_ORDER_USE_CASE,
      inject: [OrderRepository],
      useFactory: buildGetOrderUseCase,
    },
    {
      provide: UPDATE_ORDER_STATUS_USE_CASE,
      inject: [OrderRepository, UpdateOrderQueueGateway],
      useFactory: buildUpdateOrderStatusUseCase,
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
/* v8 ignore stop */
