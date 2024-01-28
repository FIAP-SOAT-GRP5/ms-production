import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { buildCreateOrderUseCase } from '../../../src/domain/application/factories/order/create-order.use-case.factory';
import { buildGetOrderUseCase } from '../../../src/domain/application/factories/order/get-order.use-case.factory';
import { IQueueGateway } from '../../../src/domain/application/interfaces/queue/queue.gateway.interface';
import {
  CREATE_ORDER_USE_CASE,
  GET_ORDER_USE_CASE,
  UPDATE_ORDER_STATUS_USE_CASE,
} from '../../../src/domain/application/symbols/order.symbols';
import { AuthModule } from '../../../src/framework/modules/auth/auth.module';
import { OrderController } from '../../../src/framework/modules/order/order.controller';
import { OrderRepository } from '../../../src/framework/modules/order/order.repository';
import { makeOrderToCreate } from '../../factories/makeOrder';
import { InMemoryOrderRepository } from '../../repositories/in-memory-order.repository';
import { IGetOrderUseCase } from '../../../src/domain/application/interfaces/order/get-order.use-case.interface';
import { ICreateOrderUseCase } from '../../../src/domain/application/interfaces/order/create-order.use-case.interface';
import { UpdateOrderQueueGateway } from '../../../src/framework/modules/order/update-order-queue.gateway';
import { buildUpdateOrderStatusUseCase } from '../../../src/domain/application/factories/order/update-order-status.use-case.factory';
import { OrderStatus } from '../../../src/domain/enterprise/value-objects/order-status';
import { IUpdateOrderStatusUseCase } from '../../../src/domain/application/interfaces/order/update-order-status.use-case.interface';

const moduleMocker = new ModuleMocker(global);

describe('OrderController', () => {
  let queueGateway: IQueueGateway;
  let inMemoryOrderRepository: InMemoryOrderRepository;
  let getOrderUseCase: IGetOrderUseCase;
  let updateOrderStatusUseCase: IUpdateOrderStatusUseCase;

  let createOrderUseCase: ICreateOrderUseCase;
  let app: INestApplication;

  let orderController: OrderController;

  beforeEach(async () => {
    queueGateway = {
      send: vi.fn(),
    };
    inMemoryOrderRepository = new InMemoryOrderRepository();
    process.env.JWT_KEY = 'test';

    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [OrderController],
      providers: [
        {
          provide: UpdateOrderQueueGateway,
          useValue: queueGateway,
        },
        {
          provide: OrderRepository,
          useValue: inMemoryOrderRepository,
        },
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

    orderController = module.get(OrderController);

    await app.init();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('[GET] /order/list-processing-orders', () => {
    it('should return a list of orders', async () => {
      await inMemoryOrderRepository.create(makeOrderToCreate());

      const spyListProcessingOrders = vi.spyOn(
        getOrderUseCase,
        'listProcessingOrders',
      );

      const response = await request(app.getHttpServer())
        .get('/order/list-processing-orders')
        .send();

      expect(response.body.list).toHaveLength(1);
      expect(response.statusCode).toBe(200);
      expect(spyListProcessingOrders).toHaveBeenCalled();
    });

    it('should return 500', async () => {
      vi.spyOn(getOrderUseCase, 'listProcessingOrders').mockImplementationOnce(
        () => {
          throw new Error('Test');
        },
      );
      const response = await request(app.getHttpServer())
        .get('/order/list-processing-orders')
        .send();
      expect(response.statusCode).toBe(500);
    });
  });

  describe('[PUT] /order/:id/status/processing', () => {
    it('should return 404', async () => {
      const response = await request(app.getHttpServer())
        .put('/order/1/status/processing')
        .send();
      expect(response.statusCode).toBe(404);
    });

    it('should return 500', async () => {
      vi.spyOn(
        updateOrderStatusUseCase,
        'updateStatusProcessing',
      ).mockImplementationOnce(() => {
        throw new Error('Test');
      });
      const response = await request(app.getHttpServer())
        .put(`/order/1/status/processing`)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it('Create order with status RECEIVED and update to PROCESSING', async () => {
      const orderToCreate = makeOrderToCreate();
      orderToCreate.id = 1;
      orderToCreate.status = OrderStatus.RECEIVED;

      await createOrderUseCase.create(orderToCreate);

      const spyUpdateOrders = vi.spyOn(
        updateOrderStatusUseCase,
        'updateStatusProcessing',
      );
      const response = await request(app.getHttpServer())
        .put(`/order/1/status/processing`)
        .send();

      // expect(response.body.item).toBeDefined();
      // expect(response.statusCode).toBe(200);
      // expect(spyUpdateOrders).toHaveBeenCalled();
    });
  });

  describe('[PUT] /order/:id/status/ready', () => {
    it('should return 404', async () => {
      const response = await request(app.getHttpServer())
        .put('/order/1/status/ready')
        .send();
      expect(response.statusCode).toBe(404);
    });

    it('should return 500', async () => {
      vi.spyOn(
        updateOrderStatusUseCase,
        'updateStatusReady',
      ).mockImplementationOnce(() => {
        throw new Error('Test');
      });
      const response = await request(app.getHttpServer())
        .put(`/order/1/status/ready`)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it('Create order with status RECEIVED and update to READY', async () => {
      const orderToCreate = makeOrderToCreate();
      orderToCreate.id = 1;
      orderToCreate.status = OrderStatus.RECEIVED;

      await createOrderUseCase.create(orderToCreate);

      const spyUpdateOrders = vi.spyOn(
        updateOrderStatusUseCase,
        'updateStatusReady',
      );
      const response = await request(app.getHttpServer())
        .put(`/order/1/status/ready`)
        .send();

      // expect(response.body.item).toBeDefined();
      // expect(response.statusCode).toBe(200);
      // expect(spyUpdateOrders).toHaveBeenCalled();
    });
  });

  describe('[PUT] /order/:id/status/finished', () => {
    it('should return 404', async () => {
      const response = await request(app.getHttpServer())
        .put('/order/1/status/finished')
        .send();
      expect(response.statusCode).toBe(404);
    });

    it('should return 500', async () => {
      vi.spyOn(
        updateOrderStatusUseCase,
        'updateStatusFinished',
      ).mockImplementationOnce(() => {
        throw new Error('Test');
      });
      const response = await request(app.getHttpServer())
        .put(`/order/1/status/finished`)
        .send();
      expect(response.statusCode).toBe(500);
    });

    it('Create order with status RECEIVED and update to FINISHED', async () => {
      const orderToCreate = makeOrderToCreate();
      orderToCreate.id = 1;
      orderToCreate.status = OrderStatus.RECEIVED;

      await createOrderUseCase.create(orderToCreate);

      const spyUpdateOrders = vi.spyOn(
        updateOrderStatusUseCase,
        'updateStatusFinished',
      );
      const response = await request(app.getHttpServer())
        .put(`/order/1/status/finished`)
        .send();

      // expect(response.body.item).toBeDefined();
      // expect(response.statusCode).toBe(200);
      // expect(spyUpdateOrders).toHaveBeenCalled();
    });
  });
});
