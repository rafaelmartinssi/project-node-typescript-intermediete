import { container } from 'tsyringe';
import { IOrderRepository } from '../repositories/IOrderRepository';
import OrderRepository from '../repositories/OrderRepository';
import FindOrderController from '../useCases/findOrder/FindOrdersController';

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository,
);

container.registerSingleton('FindOrderController', FindOrderController);
