/* v8 ignore start */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IOrderRepository } from '../../../domain/application/interfaces/order/order-repository.use-case.interface';
import { OrderToCreateDto } from '../../../domain/enterprise/dtos/order-to-create.dto';
import { Order } from '../../../domain/enterprise/entities/order.entity';
import { OrderStatus } from '../../../domain/enterprise/value-objects/order-status';
import { OrderEntity } from '../../entities/order.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  updateStatusReceived(id: number): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  updateStatusProcessing(id: number): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  updateStatusReady(id: number): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  updateStatusFinished(id: number): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  listProcessingOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        status: OrderStatus.PROCESSING,
      },
    });
  }

  async updateStatus(id: number, status: OrderStatus): Promise<boolean> {
    const exists = this.orderRepository.findOneBy({ id });
    if (!exists) return false;
    await this.orderRepository.save({
      id,
      status,
    });
    return true;
  }

  async create(orderToCreate: OrderToCreateDto): Promise<Order> {
    return this.orderRepository.save(orderToCreate).then((order) => {
      return this.findById(order.id);
    });
  }

  findById(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: {
        id,
      },
    });
  }
}
/* v8 ignore stop */
