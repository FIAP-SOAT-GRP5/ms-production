import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
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
import { CreateOrderQueueGateway } from '../../../framework/modules/order/create-order-queue.gateway';
import { UpdateOrderQueueGateway } from '../../../framework/modules/order/update-order-queue.gateway';
import { buildUpdateOrderStatusUseCase } from '../../../domain/application/factories/order/update-order-status.use-case.factory';

const moduleMocker = new ModuleMocker(global);

describe('OrderController', () => {
  let queueGateway: IQueueGateway;
  let inMemoryOrderRepository: InMemoryOrderRepository;
  let getOrderUseCase: IGetOrderUseCase;
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

    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('[GET] /order/:id', () => {
  //   it('should return a order', async () => {
  //     const order = await inMemoryOrderRepository.create(makeOrderToCreate());

  //     const spyFindById = jest.spyOn(getOrderUseCase, 'findById');

  //     const response = await request(app.getHttpServer())
  //       .get(`/order/${order.id}`)
  //       .send();

  //     expect(response.body.order).toBeDefined();
  //     expect(response.statusCode).toBe(200);
  //     expect(spyFindById).toHaveBeenCalled();
  //   });

  //   it('should return 404', async () => {
  //     const response = await request(app.getHttpServer())
  //       .get('/order/1')
  //       .send();
  //     expect(response.statusCode).toBe(404);
  //   });

  //   it('should return 500', async () => {
  //     jest.spyOn(getOrderUseCase, 'findById').mockImplementationOnce(() => {
  //       throw new Error('Test');
  //     });
  //     const response = await request(app.getHttpServer())
  //       .get('/order/1')
  //       .send();
  //     expect(response.statusCode).toBe(500);
  //   });
  // });

  describe('[GET] /order/list-processing-orders', () => {
    it('should return a list of orders', async () => {
      const teste = await inMemoryOrderRepository.create(makeOrderToCreate());

      const spyListAllOrders = jest.spyOn(
        getOrderUseCase,
        'listProcessingOrders',
      );

      const response = await request(app.getHttpServer())
        .get('/order/list-processing-orders')
        .send();

      expect(response.body.list).toHaveLength(1);
      expect(response.statusCode).toBe(200);
      expect(spyListAllOrders).toHaveBeenCalled();
    });

    it('should return 500', async () => {
      jest
        .spyOn(getOrderUseCase, 'listProcessingOrders')
        .mockImplementationOnce(() => {
          throw new Error('Test');
        });
      const response = await request(app.getHttpServer())
        .get('/order/list-processing-orders')
        .send();
      expect(response.statusCode).toBe(500);
    });
  });

  // describe('[POST] /order', () => {
  //   it('should create a order', async () => {
  //     const item = makeItem();
  //     await inMemoryItemRepository.createItem(item);
  //     const dto: CreateOrderBodyDto = {
  //       itemsIds: [
  //         {
  //           id: item.id,
  //           quantity: 1,
  //         },
  //       ],
  //     };
  //     const spyCreateOrder = jest.spyOn(createOrderUseCase, 'create');

  //     const jwt = new JwtService({ secretOrPrivateKey: env.JWT_KEY }).sign({
  //       sub: 1,
  //     });

  //     const response = await request(app.getHttpServer())
  //       .post('/order')
  //       .set('Authorization', `Bearer ${jwt}`)
  //       .send(dto);

  //     expect(response.body.order).toBeDefined();
  //     expect(response.statusCode).toBe(201);
  //     expect(spyCreateOrder).toHaveBeenCalled();
  //     expect(queueGateway.send).toHaveBeenCalled();
  //   });

  //   it('should return 500', async () => {
  //     jest.spyOn(createOrderUseCase, 'create').mockImplementationOnce(() => {
  //       throw new Error('Test');
  //     });

  //     const jwt = new JwtService({ secretOrPrivateKey: env.JWT_KEY }).sign({
  //       sub: 1,
  //     });

  //     const response = await request(app.getHttpServer())
  //       .post('/order')
  //       .set('Authorization', `Bearer ${jwt}`)
  //       .send();
  //     expect(response.statusCode).toBe(500);
  //   });

  //   it('should return 400 with order is without items', async () => {
  //     const dto: CreateOrderBodyDto = {
  //       itemsIds: [],
  //     };

  //     const jwt = new JwtService({ secretOrPrivateKey: env.JWT_KEY }).sign({
  //       sub: 1,
  //     });

  //     const response = await request(app.getHttpServer())
  //       .post('/order')
  //       .set('Authorization', `Bearer ${jwt}`)
  //       .send(dto);
  //     expect(response.statusCode).toBe(400);
  //   });
  // });
});
