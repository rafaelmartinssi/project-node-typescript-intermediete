import Order from '@modules/orders/entities/Order';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}

export default FindOrderService;
