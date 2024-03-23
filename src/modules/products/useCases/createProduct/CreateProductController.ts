import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '@modules/products/useCases/createProduct/CreateProductService';

class CreateProductController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const productService = container.resolve(CreateProductService);
    const user = await productService.execute({
      name,
      price,
      quantity,
    });
    return response.status(201).json(user);
  }
}

export default CreateProductController;
