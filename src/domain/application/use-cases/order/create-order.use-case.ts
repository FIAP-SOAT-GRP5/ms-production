import { CreateOrderDto } from '../../../enterprise/dtos/create-order.dto';
import { Order } from '../../../enterprise/entities/order.entity';
import { OrderStatus } from '../../../enterprise/value-objects/order-status';
import { ICreateOrderUseCase } from '../../interfaces/order/create-order.use-case.interface';
import { IOrderRepository } from '../../interfaces/order/order-repository.use-case.interface';

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = await this.repository.create({
      id: dto.id,
      status: OrderStatus.RECEIVED,
    });
    return order;
  }
}
