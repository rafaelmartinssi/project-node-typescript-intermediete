import { container } from 'tsyringe';
import { IOrderRepository } from '../repositories/IOrderRepository';
import OrderRepository from '../repositories/OrderRepository';

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);
