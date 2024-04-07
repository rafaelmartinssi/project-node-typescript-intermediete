import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindUserService from './FindUserService';
import { instanceToInstance } from 'class-transformer';

class FindUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userService = container.resolve(FindUserService);

    const user = await userService.execute(id);

    return response.status(200).json(instanceToInstance(user));
  }
}

export default FindUserController;
