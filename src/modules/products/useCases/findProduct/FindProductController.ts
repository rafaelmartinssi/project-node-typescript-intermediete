import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindProductService from './FindProductService';

class FindProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productService = container.resolve(FindProductService);

    const product = await productService.execute(id);

    return response.status(200).json(product);
  }
}

export default FindProductController;
