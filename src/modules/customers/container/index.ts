import { container } from 'tsyringe';
import { ICustomerRepository } from '../repositories/ICustomerRepository';
import CustomerRepository from '../repositories/CustomerRepository';
import CreateCustomerController from '../useCases/createCustomer/CreateCustomerController';
import DeleteCustomerController from '../useCases/deleteCustomer/DeleteCustomerController';
import FindCustomerController from '../useCases/findCustomer/FindCustomerController';
import ListCustomersController from '../useCases/listCustomers/ListCustomersController';
import UpdateCustomerController from '../useCases/updateCustomer/UpdateCustomerController';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository,
);

container.registerSingleton(
  'CreateCustomerController',
  CreateCustomerController,
);

container.registerSingleton(
  'DeleteCustomerController',
  DeleteCustomerController,
);

container.registerSingleton(
  'UpdateCustomerController',
  UpdateCustomerController,
);

container.registerSingleton('FindCustomerController', FindCustomerController);
container.registerSingleton('ListCustomersController', ListCustomersController);
