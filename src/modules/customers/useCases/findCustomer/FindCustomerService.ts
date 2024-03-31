import { ICustomerRepository } from '@modules/customers/repositories/ICustomerRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(id: string) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }
    return customer;
  }
}

export default FindCustomerService;
