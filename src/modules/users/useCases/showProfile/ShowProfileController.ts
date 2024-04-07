import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from './ShowProfileService';
import { instanceToInstance } from 'class-transformer';

class ShowProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute(id);

    return response.status(200).json(instanceToInstance(user));
  }
}

export default ShowProfileController;
