import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteCustomerService from './DeleteCustomerService';

class DeleteCustomerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = container.resolve(DeleteCustomerService);

    await deleteCustomerService.execute(id);

    return response.status(200).send();
  }
}

export default DeleteCustomerController;
