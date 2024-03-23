import { Router } from 'express';
import { container } from 'tsyringe';
import CreateProductController from '@modules/products/useCases/createProduct/CreateProductController';
import ListProductsController from '../useCases/listProducts/ListProductsController';
import FindProductController from '../useCases/findProduct/FindProductController';
import UpdateProductController from '../useCases/updateProduct/UpdateProductController';
import DeleteProductController from '../useCases/deleteProduct/DeleteProductController';

const productsRouter = Router();
const createProductController = container.resolve(CreateProductController);
const listProductsController = container.resolve(ListProductsController);
const findProductController = container.resolve(FindProductController);
const updateProductController = container.resolve(UpdateProductController);
const deleteProductController = container.resolve(DeleteProductController);

productsRouter.post('/', (request, response) => {
  return createProductController.handle(request, response);
});

productsRouter.put('/:id', (request, response) => {
  return updateProductController.handle(request, response);
});

productsRouter.get('/', (request, response) => {
  return listProductsController.handle(request, response);
});

productsRouter.get('/:id', (request, response) => {
  return findProductController.handle(request, response);
});

productsRouter.delete('/:id', (request, response) => {
  return deleteProductController.handle(request, response);
});

export { productsRouter };
