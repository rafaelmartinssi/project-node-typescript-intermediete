import User from '@modules/users/entities/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import authConfig from '@config/auth';

export type CreateLoginDTO = {
  email: string;
  password: string;
};

export type IResponse = {
  user: User;
  accessToken: string;
};

@injectable()
class CreateLoginService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email or password combination', 401);
    }

    const passwordConfirmed = compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email or password combination', 401);
    }

    const accessToken = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      accessToken,
    };
  }
}

export default CreateLoginService;
