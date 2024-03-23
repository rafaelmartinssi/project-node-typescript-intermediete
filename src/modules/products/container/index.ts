import { container } from 'tsyringe';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import ProductRepository from '@modules/products/repositories/ProductRepository';
import CreateProductController from '../useCases/createProduct/CreateProductController';
import ListProductsController from '../useCases/listProducts/ListProductsController';
import FindProductController from '../useCases/findProduct/FindProductController';
import UpdateProductController from '../useCases/updateProduct/UpdateProductController';
import DeleteProductController from '../useCases/deleteProduct/DeleteProductController';

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton('CreateProductController', CreateProductController);
container.registerSingleton('ListProductsController', ListProductsController);
container.registerSingleton('FindProductController', FindProductController);
container.registerSingleton('UpdateProductController', UpdateProductController);
container.registerSingleton('DeleteProductController', DeleteProductController);
