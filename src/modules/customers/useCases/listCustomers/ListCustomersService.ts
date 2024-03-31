import {
  ICustomerRepository,
  PaginationProps,
} from '@modules/customers/repositories/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

type Params = {
  page: number;
  limit: number;
};

@injectable()
class ListCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ page, limit }: Params): Promise<PaginationProps> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    return this.customerRepository.findAll({ page, skip, take });
  }
}

export default ListCustomersService;
