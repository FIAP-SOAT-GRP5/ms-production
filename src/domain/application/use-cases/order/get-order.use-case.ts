import { Order } from '../../../enterprise/entities/order.entity';
import { IGetOrderUseCase } from '../../interfaces/order/get-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.use-case.interface';

export class GetOrderUseCase implements IGetOrderUseCase {
  constructor(private readonly repository: IOrderRepository) {}
  findById(id: number): Promise<Order> {
    return this.repository.findById(id);
  }

  listProcessingOrders(): Promise<Order[]> {
    return this.repository.listProcessingOrders();
  }
}
