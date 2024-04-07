import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from './CreateUserService';
import { instanceToInstance } from 'class-transformer';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const userService = container.resolve(CreateUserService);
    const user = await userService.execute({
      name,
      email,
      password,
    });
    return response.status(201).json(instanceToInstance(user));
  }
}

export default CreateUserController;
