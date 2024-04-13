/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateCustomerDTO,
  ICustomerRepository,
  PaginationParams,
  PaginationProps,
} from '../ICustomerRepository';
import Customer from '@modules/customers/entities/Customer';
import { v4 as uuidv4 } from 'uuid';

class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];
  public async create({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async update(customer: Customer): Promise<Customer> {
    return customer;
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProps> {
    return {} as PaginationProps;
  }

  public async findByName(name: string): Promise<Customer | null> {
    return this.customers.find(c => c.name === name) || null;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    return this.customers.find(c => c.email === email) || null;
  }

  public async findById(id: string): Promise<Customer | null> {
    return this.customers.find(c => c.id === id) || null;
  }

  public async delete(id: string): Promise<void> {}
}

export default FakeCustomerRepository;
