import User from '@modules/users/entities/User';
import {
  CreateUserDTO,
  IUserRepository,
} from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const userEmailExists = await this.userRepository.findByEmail(email);
    if (userEmailExists) {
      throw new AppError('User email alredy exists');
    }

    return this.userRepository.create({
      name,
      email,
      password,
    });
  }
}

export default CreateUserService;
