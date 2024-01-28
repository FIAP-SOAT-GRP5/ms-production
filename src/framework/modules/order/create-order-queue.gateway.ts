// /* v8 ignore start */
import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { CREATE_ORDER_USE_CASE } from '../../../domain/application/symbols/order.symbols';
import { ICreateOrderUseCase } from '../../../domain/application/interfaces/order/create-order.use-case.interface';

import env from '../../../config/env';

@Injectable()
export class CreateOrderQueueGateway
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly consumer: Consumer;

  constructor(
    @Inject(CREATE_ORDER_USE_CASE)
    private readonly createOrderUseCase: ICreateOrderUseCase,
  ) {
    this.consumer = Consumer.create({
      queueUrl: env.QUEUE_CREATE_ORDER_URL ?? '',
      region: env.AWS_REGION ?? 'us-east-1',
      handleMessage: async (message) => {
        console.log('CreateOrderQueueGateway');
        const { id, status } = JSON.parse(message.Body);
        await this.createOrderUseCase.create({ id, status });
      },
    });
  }

  onApplicationBootstrap() {
    this.consumer.start();
  }

  onApplicationShutdown() {
    this.consumer.stop();
  }
}
/* v8 ignore stop */
