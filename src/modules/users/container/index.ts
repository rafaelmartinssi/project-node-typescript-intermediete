import { container } from 'tsyringe';
import { IUserRepository } from '../repositories/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import CreateUserController from '../useCases/createUser/CreateUserController';
import ListUsersController from '../useCases/listUsers/ListUsersController';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton('CreateUserController', CreateUserController);
container.registerSingleton('ListUsersController', ListUsersController);
