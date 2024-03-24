import { Repository } from 'typeorm';
import User from '@modules/users/entities/User';
import { dataSource } from '@shared/typeorm';
import { CreateUserDTO, IUserRepository } from './IUserRepository';

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

  public async findByName(name: string): Promise<User | null> {
    return this.dataSource.findOneBy({ name });
  }

  public async findById(id: string): Promise<User | null> {
    return this.dataSource.findOneBy({ id });
  }
}

export default UserRepository;
