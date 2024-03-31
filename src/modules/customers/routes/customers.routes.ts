import { Router } from 'express';
import { container } from 'tsyringe';
import { Joi, Segments, celebrate } from 'celebrate';
import isAutenticated from '@modules/users/middlewares/isAutenticated';
import CreateCustomerController from '../useCases/createCustomer/CreateCustomerController';
import ListCustomersController from '../useCases/listCustomers/ListCustomersController';
import FindCustomerController from '../useCases/findCustomer/FindCustomerController';
import UpdateCustomerController from '../useCases/updateCustomer/UpdateCustomerController';
import DeleteCustomerController from '../useCases/deleteCustomer/DeleteCustomerController';

const customersRouter = Router();
const createCustomerController = container.resolve(CreateCustomerController);
const listCustomersController = container.resolve(ListCustomersController);
const findCustomerController = container.resolve(FindCustomerController);
const updateCustomerController = container.resolve(UpdateCustomerController);
const deleteCustomerController = container.resolve(DeleteCustomerController);

customersRouter.use(isAutenticated);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }),
  (request, response) => {
    return createCustomerController.handle(request, response);
  },
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return updateCustomerController.handle(request, response);
  },
);

customersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return listCustomersController.handle(request, response);
  },
);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return findCustomerController.handle(request, response);
  },
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return deleteCustomerController.handle(request, response);
  },
);

export { customersRouter };
