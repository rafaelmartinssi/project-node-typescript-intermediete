import { dataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO, IOrderRepository } from './IOrderRepository';
import Order from '../entities/Order';

class OrderRepository implements IOrderRepository {
  private dataSource: Repository<Order>;

  public constructor() {
    this.dataSource = dataSource.getRepository(Order);
  }

  public async create({ customer, products }: CreateOrderDTO): Promise<Order> {
    const order = this.dataSource.create({
      customer,
      order_products: products,
    });
    return this.dataSource.save(order);
  }

  public async findById(id: string): Promise<Order | null> {
    return this.dataSource.findOne({
      where: {
        id: id,
      },
      relations: ['order_products', 'customer'],
    });
  }
}

export default OrderRepository;
