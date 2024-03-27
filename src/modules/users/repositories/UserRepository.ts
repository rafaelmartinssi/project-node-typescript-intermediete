import { Repository } from 'typeorm';
import User from '@modules/users/entities/User';
import { dataSource } from '@shared/typeorm';
import {
  CreateUserDTO,
  IUserRepository,
  PaginationParams,
  PaginationProps,
} from '@modules/users/repositories/IUserRepository';

class UserRepository implements IUserRepository {
  private dataSource: Repository<User>;

  constructor() {
    this.dataSource = dataSource.getRepository(User);
  }

  public async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.dataSource.create({
      name,
      email,
      password,
    });

    return this.dataSource.save(user);
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProps> {
    const [users, count] = await this.dataSource
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    } as PaginationProps;

    return result;
  }

  public async findByName(name: string): Promise<User | null> {
    return this.dataSource.findOneBy({ name });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.dataSource.findOneBy({ email });
  }

  public async findById(id: string): Promise<User | null> {
    return this.dataSource.findOneBy({ id });
  }
}

export default UserRepository;
