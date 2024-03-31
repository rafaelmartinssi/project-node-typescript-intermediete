import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from './CreateCustomerService';

class CreateCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomerService = container.resolve(CreateCustomerService);
    const customer = await createCustomerService.execute({
      name,
      email,
    });
    return response.status(201).json(customer);
  }
}

export default CreateCustomerController;
