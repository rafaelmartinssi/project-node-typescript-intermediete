import { Router } from 'express';
import { container } from 'tsyringe';
import { Joi, Segments, celebrate } from 'celebrate';
import isAutenticated from '../middlewares/isAutenticated';
import ShowProfileController from '../useCases/showProfile/ShowProfileController';
import UpdateProfileController from '../useCases/updateProfile/UpdateProfileController';

const profileRouter = Router();
const showProfileController = container.resolve(ShowProfileController);
const updateProfileController = container.resolve(UpdateProfileController);

profileRouter.use(isAutenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return updateProfileController.handle(request, response);
  },
);

profileRouter.get('/', (request, response) => {
  return showProfileController.handle(request, response);
});

export { profileRouter };
