import User from '@modules/users/entities/User';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
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
  data: User[];
};

export interface IUserRepository {
  create({ name, email, password }: CreateUserDTO): Promise<User>;
  findByName(name: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
