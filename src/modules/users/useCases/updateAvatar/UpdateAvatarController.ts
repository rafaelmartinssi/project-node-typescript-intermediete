import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAvatarService from './UpdateAvatarService';
import { instanceToInstance } from 'class-transformer';

class UpdateAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userService = container.resolve(UpdateAvatarService);
    const user = await userService.execute({
      userId: id,
      avatarFilename: request.file!.filename,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export default UpdateAvatarController;
