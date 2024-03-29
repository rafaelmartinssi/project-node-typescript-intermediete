import { Repository } from 'typeorm';
import { dataSource } from '@shared/typeorm';
import { IUserTokenRepository } from './IUserTokenRepository';
import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private dataSource: Repository<UserToken>;

  constructor() {
    this.dataSource = dataSource.getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.dataSource.create({
      user_id,
    });

    return this.dataSource.save(userToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    return this.dataSource.findOneBy({ token });
  }
}

export default UserTokenRepository;
