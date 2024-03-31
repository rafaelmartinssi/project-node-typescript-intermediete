import {
  CreateCustomerDTO,
  ICustomerRepository,
} from '@modules/customers/repositories/ICustomerRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ name, email }: CreateCustomerDTO) {
    const customerEmailExists =
      await this.customerRepository.findByEmail(email);
    if (customerEmailExists) {
      throw new AppError('Customer email alredy exists');
    }

    return this.customerRepository.create({
      name,
      email,
    });
  }
}

export default CreateCustomerService;
