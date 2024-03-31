import { Router } from 'express';
import { container } from 'tsyringe';
import { Joi, Segments, celebrate } from 'celebrate';
import isAutenticated from '@modules/users/middlewares/isAutenticated';
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

productsRouter.use(isAutenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  }),
  (request, response) => {
    return createProductController.handle(request, response);
  },
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return updateProductController.handle(request, response);
  },
);

productsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return listProductsController.handle(request, response);
  },
);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return findProductController.handle(request, response);
  },
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return deleteProductController.handle(request, response);
  },
);

export { productsRouter };
