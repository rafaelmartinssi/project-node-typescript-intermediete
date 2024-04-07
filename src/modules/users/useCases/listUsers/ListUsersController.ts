import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUsersService from './ListUsersService';
import { instanceToInstance } from 'class-transformer';

class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1;
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 10;

    const userService = container.resolve(ListUsersService);

    const users = await userService.execute({ page, limit });

    return response.status(200).json(instanceToInstance(users));
  }
}

export default ListUsersController;
