import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import * as supertest from 'supertest';
import request from 'supertest';

import { buildCreateOrderUseCase } from '../../../domain/application/factories/order/create-order.use-case.factory';
import { buildGetOrderUseCase } from '../../../domain/application/factories/order/get-order.use-case.factory';
import { IQueueGateway } from '../../../domain/application/interfaces/queue/queue.gateway.interface';
import {
  CREATE_ORDER_USE_CASE,
  GET_ORDER_USE_CASE,
  UPDATE_ORDER_STATUS_USE_CASE,
} from '../../../domain/application/symbols/order.symbols';
import { AuthModule } from '../../../framework/modules/auth/auth.module';
import { OrderController } from '../../../framework/modules/order/order.controller';
import { OrderRepository } from '../../../framework/modules/order/order.repository';
import { makeOrderToCreate } from '../../factories/makeOrder';
import { InMemoryOrderRepository } from '../../repositories/in-memory-order.repository';
import { IGetOrderUseCase } from '../../../domain/application/interfaces/order/get-order.use-case.interface';
import { ICreateOrderUseCase } from '../../../domain/application/interfaces/order/create-order.use-case.interface';
import { UpdateOrderQueueGateway } from '../../../framework/modules/order/update-order-queue.gateway';
import { buildUpdateOrderStatusUseCase } from '../../../domain/application/factories/order/update-order-status.use-case.factory';
import { OrderStatus } from '../../../domain/enterprise/value-objects/order-status';
import { IUpdateOrderStatusUseCase } from '../../../domain/application/interfaces/order/update-order-status.use-case.interface';

const moduleMocker = new ModuleMocker(global);

describe('OrderController', () => {
  let queueGateway: IQueueGateway;
  let inMemoryOrderRepository: InMemoryOrderRepository;
  let getOrderUseCase: IGetOrderUseCase;
  let updateOrderStatusUseCase: IUpdateOrderStatusUseCase;

  let createOrderUseCase: ICreateOrderUseCase;
  let app: INestApplication;

  beforeEach(async () => {
    queueGateway = {
      send: jest.fn(),
    };
    inMemoryOrderRepository = new InMemoryOrderRepository();
    process.env.JWT_KEY = 'test';

    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [OrderController],
      providers: [
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
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    app = module.createNestApplication();

    getOrderUseCase = module.get(GET_ORDER_USE_CASE);
    createOrderUseCase = module.get(CREATE_ORDER_USE_CASE);
    updateOrderStatusUseCase = module.get(UPDATE_ORDER_STATUS_USE_CASE);

    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('[GET] /order/list-processing-orders', () => {
    it('should return a list of orders', async () => {
      const orderToCreate = makeOrderToCreate();
      orderToCreate.status = OrderStatus.PROCESSING;

      await inMemoryOrderRepository.create(orderToCreate);

      const spyListProcessingOrders = jest.spyOn(
        getOrderUseCase,
        'listProcessingOrders',
      );

      const response = await supertest(app.getHttpServer())
        .get('/order/list-processing-orders')
        .send();

      expect(response.statusCode).toBe(200);
      expect(spyListProcessingOrders).toHaveBeenCalled();
    });

    it('should return 500', async () => {
      jest
        .spyOn(getOrderUseCase, 'listProcessingOrders')
        .mockImplementationOnce(() => {
          throw new Error('Test');
        });
      const response = await supertest(app.getHttpServer())
        .get('/order/list-processing-orders')
        .send();
      expect(response.statusCode).toBe(500);
    });
  });

  describe('[PUT] /order/:id/status/processing', () => {
    it('Create order with status RECEIVED and update to PROCESSING', async () => {
      const orderToCreate = makeOrderToCreate();
      orderToCreate.id = 1;
      orderToCreate.status = OrderStatus.RECEIVED;

      await createOrderUseCase.create(orderToCreate);

      const spyListProcessingOrders = jest.spyOn(
        updateOrderStatusUseCase,
        'updateStatusProcessing',
      );

      const response = await supertest(app.getHttpServer())
        .put(`/order/1/status/processing`)
        .send();

      // expect(response.body.item).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(spyListProcessingOrders).toHaveBeenCalled();
    });
  });
});