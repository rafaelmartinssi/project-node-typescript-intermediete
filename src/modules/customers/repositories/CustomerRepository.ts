import { dataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import Customer from '../entities/Customer';
import {
  CreateCustomerDTO,
  ICustomerRepository,
  PaginationParams,
  PaginationProps,
} from './ICustomerRepository';

class CustomerRepository implements ICustomerRepository {
  private dataSource: Repository<Customer>;

  public constructor() {
    this.dataSource = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const product = this.dataSource.create({
      name,
      email,
    });
    return this.dataSource.save(product);
  }

  public async update(customer: Customer): Promise<Customer> {
    return this.dataSource.save(customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProps> {
    const [customers, count] = await this.dataSource
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    } as PaginationProps;

    return result;
  }

  public async findByName(name: string): Promise<Customer | null> {
    return this.dataSource.findOneBy({ name });
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    return this.dataSource.findOneBy({ email });
  }

  public async findById(id: string): Promise<Customer | null> {
    return this.dataSource.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }
}

export default CustomerRepository;
