import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from './UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

class UpdateProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password } = request.body;

    const showProfileService = container.resolve(UpdateProfileService);

    const user = await showProfileService.execute({
      userId: id,
      name,
      email,
      password,
    });

    return response.status(200).json(instanceToInstance(user));
  }
}

export default UpdateProfileController;
