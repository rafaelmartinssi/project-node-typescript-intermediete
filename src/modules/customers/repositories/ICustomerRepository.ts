import Customer from '../entities/Customer';

export interface CreateCustomerDTO {
  name: string;
  email: string;
}

export type PaginationParams = {
  page: number;
  skip: number;
  take: number;
};

export type PaginationProps = {
  per_page: number;
  total: number;
  current_page: number;
  data: Customer[];
};

export interface ICustomerRepository {
  create({ name, email }: CreateCustomerDTO): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  findAll({ page, skip, take }: PaginationParams): Promise<PaginationProps>;
  findByName(name: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  delete(id: string): Promise<void>;
}
