import { container } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import CreateUserController from '../useCases/createUser/CreateUserController';
import ListUsersController from '../useCases/listUsers/ListUsersController';
import FindUserController from '../useCases/findUser/FindUserController';
import CreateLoginController from '../useCases/createLogin/CreateLoginController';
import UpdateAvatarController from '@modules/users/useCases/updateAvatar/UpdateAvatarController';
import SendForgotPasswordEmailController from '../useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController';
import { IUserTokenRepository } from '../repositories/IUserTokenRepository';
import UserTokenRepository from '../repositories/UserTokenRepository';
import ResetPasswordController from '../useCases/resetPassword/ResetPasswordController';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
container.registerSingleton('CreateUserController', CreateUserController);
container.registerSingleton('ListUsersController', ListUsersController);
container.registerSingleton('FindUserController', FindUserController);
container.registerSingleton('CreateLoginController', CreateLoginController);
container.registerSingleton('UpdateAvatarController', UpdateAvatarController);
container.registerSingleton(
  'SendForgotPasswordEmailController',
  SendForgotPasswordEmailController,
);
container.registerSingleton('ResetPasswordController', ResetPasswordController);
