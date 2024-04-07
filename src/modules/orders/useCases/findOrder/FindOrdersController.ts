import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindOrderService from './FindOrderService';

class FindOrderController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findOrderService = container.resolve(FindOrderService);
    const user = await findOrderService.execute(id);
    return response.status(200).json(user);
  }
}

export default FindOrderController;
