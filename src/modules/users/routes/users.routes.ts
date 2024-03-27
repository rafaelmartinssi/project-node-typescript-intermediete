import { Router } from 'express';
import { container } from 'tsyringe';
import CreateUserController from '../useCases/createUser/CreateUserController';
import { Joi, Segments, celebrate } from 'celebrate';
import ListUsersController from '../useCases/listUsers/ListUsersController';
import FindUserController from '../useCases/findUser/FindUserController';

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const findUserController = container.resolve(FindUserController);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return createUserController.handle(request, response);
  },
);

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return listUsersController.handle(request, response);
  },
);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return findUserController.handle(request, response);
  },
);

export { usersRouter };
