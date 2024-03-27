import { container } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import CreateUserController from '../useCases/createUser/CreateUserController';
import ListUsersController from '../useCases/listUsers/ListUsersController';
import FindUserController from '../useCases/findUser/FindUserController';
import CreateLoginController from '../useCases/createLogin/CreateLoginController';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton('CreateUserController', CreateUserController);
container.registerSingleton('ListUsersController', ListUsersController);
container.registerSingleton('FindUserController', FindUserController);
container.registerSingleton('CreateLoginController', CreateLoginController);
