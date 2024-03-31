import {
  CreateCustomerDTO,
  ICustomerRepository,
} from '@modules/customers/repositories/ICustomerRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface UpdateCustomerDTO extends CreateCustomerDTO {
  id: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id, name, email }: UpdateCustomerDTO) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    customer.name = name;
    customer.email = email;

    return this.customerRepository.update(customer);
  }
}

export default UpdateCustomerService;
