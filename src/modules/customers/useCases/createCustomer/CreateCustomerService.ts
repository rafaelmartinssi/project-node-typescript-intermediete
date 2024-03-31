import {
  CreateCustomerDTO,
  ICustomerRepository,
} from '@modules/customers/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ name, email }: CreateCustomerDTO) {
    return this.customerRepository.create({
      name,
      email,
    });
  }
}

export default CreateCustomerService;
