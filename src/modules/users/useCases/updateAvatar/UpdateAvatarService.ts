import User from '@modules/users/entities/User';
import path from 'path';
import fs from 'fs';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import uploadConfig from '@config/upload';

interface IUpdateAvatarDTO {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    userId,
    avatarFilename,
  }: IUpdateAvatarDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    return this.userRepository.update(user);
  }
}

export default UpdateAvatarService;
