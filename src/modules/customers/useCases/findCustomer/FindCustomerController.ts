import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindCustomerService from './FindCustomerService';

class FindCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findCustomerService = container.resolve(FindCustomerService);

    const customer = await findCustomerService.execute(id);

    return response.status(200).json(customer);
  }
}

export default FindCustomerController;
