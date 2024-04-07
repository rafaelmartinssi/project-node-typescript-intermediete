import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateLoginService from './CreateLoginService';
import { instanceToInstance } from 'class-transformer';

class CreateLoginController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userService = container.resolve(CreateLoginService);

    const { user, accessToken } = await userService.execute({
      email,
      password,
    });

    return response.status(200).json(instanceToInstance({ user, accessToken }));
  }
}

export default CreateLoginController;
