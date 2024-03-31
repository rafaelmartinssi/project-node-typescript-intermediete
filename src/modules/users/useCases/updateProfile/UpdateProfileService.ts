import User from '@modules/users/entities/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

export type UpdateProfileDTO = {
  userId: string;
  name: string;
  email: string;
  password: string;
};

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
  }: UpdateProfileDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const userCheckEmail = await this.userRepository.findByEmail(email);
    if (userCheckEmail && userCheckEmail.id !== userId) {
      throw new AppError('Email addres alredy used');
    }

    user.password = await hash(password, 8);
    user.name = name;
    user.email = email;

    return this.userRepository.update(user);
  }
}

export default UpdateProfileService;
