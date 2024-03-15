/* v8 ignore start */
import {
	Inject,
	Injectable,
	OnApplicationBootstrap,
	OnApplicationShutdown,
} from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import env from '../../../config/env';
import { IUpdateOrderStatusUseCase } from '../../../domain/application/interfaces/order/update-order-status.use-case.interface';
import { UPDATE_ORDER_STATUS_USE_CASE } from '../../../domain/application/symbols/order.symbols';

@Injectable()
export class PaymentApprovedQueueGateway
	implements OnApplicationBootstrap, OnApplicationShutdown {
	private readonly consumer: Consumer;

	constructor(
		@Inject(UPDATE_ORDER_STATUS_USE_CASE)
		private readonly updateOrderUseCase: IUpdateOrderStatusUseCase,
	) {
		this.consumer = Consumer.create({
			queueUrl: `${env.QUEUE_PAYMENT_APPROVED_URL ?? ''}_production`,
			region: 'us-east-1',
			handleMessage: async (message) => {
				const { orderId } = JSON.parse(message.Body);
				await this.updateOrderUseCase.updateStatusReceived(orderId);
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
