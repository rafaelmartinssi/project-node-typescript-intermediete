import { Router } from 'express';
import { container } from 'tsyringe';
import { Joi, Segments, celebrate } from 'celebrate';
import SendForgotPasswordEmailController from '../useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController';
import ResetPasswordController from '../useCases/resetPassword/ResetPasswordController';

const passwordRouter = Router();
const sendForgotPasswordController = container.resolve(
  SendForgotPasswordEmailController,
);
const resetPasswordController = container.resolve(ResetPasswordController);

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  (request, response) => {
    return sendForgotPasswordController.handle(request, response);
  },
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return resetPasswordController.handle(request, response);
  },
);

export { passwordRouter };
