import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from './CreateOrderService';

class CreateOrderController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const createOrderService = container.resolve(CreateOrderService);
    const user = await createOrderService.execute({
      customer_id,
      products,
    });
    return response.status(201).json(user);
  }
}

export default CreateOrderController;
