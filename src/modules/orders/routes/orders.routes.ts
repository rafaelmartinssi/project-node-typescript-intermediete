import { Router } from 'express';
import { container } from 'tsyringe';
import { Joi, Segments, celebrate } from 'celebrate';
import isAutenticated from '@modules/users/middlewares/isAutenticated';
import CreateOrderController from '../useCases/createOrder/CreateOrderController';
import FindOrderController from '../useCases/findOrder/FindOrdersController';

const ordersRouter = Router();
const createOrderController = container.resolve(CreateOrderController);
const findOrderController = container.resolve(FindOrderController);

ordersRouter.use(isAutenticated);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().items({
        id: Joi.string().uuid().required(),
        quantity: Joi.number().required(),
      }),
    }),
  }),
  (request, response) => {
    return createOrderController.handle(request, response);
  },
);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return findOrderController.handle(request, response);
  },
);

export { ordersRouter };
