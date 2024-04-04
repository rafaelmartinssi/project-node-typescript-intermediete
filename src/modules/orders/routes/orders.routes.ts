import { Router } from 'express';
import { container } from 'tsyringe';
import { Joi, Segments, celebrate } from 'celebrate';
import isAutenticated from '@modules/users/middlewares/isAutenticated';
import CreateOrderController from '../useCases/createOrder/CreateOrderController';

const ordersRouter = Router();
const createOrderController = container.resolve(CreateOrderController);

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

export { ordersRouter };
