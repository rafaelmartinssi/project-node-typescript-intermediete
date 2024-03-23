import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteProductService from './DeleteProductService';

class DeleteProductController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;

    const productService = container.resolve(DeleteProductService);

    await productService.execute(id);

    return response.status(200).send();
  }
}

export default DeleteProductController;
