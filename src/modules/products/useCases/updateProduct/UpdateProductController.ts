import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProductService from './UpdateProductService';

class UpdateProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const productService = container.resolve(UpdateProductService);

    const product = await productService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.status(200).json(product);
  }
}

export default UpdateProductController;
