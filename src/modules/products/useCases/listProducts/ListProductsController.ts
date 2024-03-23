import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProductsService from './ListProductsService';

class ListProductsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1;
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 10;

    const productService = container.resolve(ListProductsService);

    const users = await productService.execute({ page, limit });

    return response.status(200).json(users);
  }
}

export default ListProductsController;
