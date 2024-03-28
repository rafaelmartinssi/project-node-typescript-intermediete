import UserToken from '../entities/UserToken';

export interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
}
