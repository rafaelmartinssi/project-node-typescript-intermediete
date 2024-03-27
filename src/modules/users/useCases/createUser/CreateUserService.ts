import User from '@modules/users/entities/User';
import {
  CreateUserDTO,
  IUserRepository,
} from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

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

    const hashedPassword = await hash(password, 8);

    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}

export default CreateUserService;
