import { Router } from 'express';
import { container } from 'tsyringe';
import { Joi, Segments, celebrate } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserController from '../useCases/createUser/CreateUserController';
import ListUsersController from '../useCases/listUsers/ListUsersController';
import FindUserController from '../useCases/findUser/FindUserController';
import CreateLoginController from '../useCases/createLogin/CreateLoginController';
import isAutenticated from '../middlewares/isAutenticated';
import UpdateAvatarController from '../useCases/updateAvatar/UpdateAvatarController';

const usersRouter = Router();
const createUserController = container.resolve(CreateUserController);
const listUsersController = container.resolve(ListUsersController);
const findUserController = container.resolve(FindUserController);
const createLoginController = container.resolve(CreateLoginController);
const updateAvatarController = container.resolve(UpdateAvatarController);

const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  isAutenticated,
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

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return createLoginController.handle(request, response);
  },
);

usersRouter.patch(
  '/avatar',
  isAutenticated,
  upload.single('avatar'),
  (request, response) => {
    return updateAvatarController.handle(request, response);
  },
);

usersRouter.get(
  '/',
  isAutenticated,
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
  isAutenticated,
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
