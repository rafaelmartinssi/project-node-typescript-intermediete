import {
  IUserRepository,
  PaginationProps,
} from '@modules/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

type Params = {
  page: number;
  limit: number;
};

@injectable()
class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ page, limit }: Params): Promise<PaginationProps> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    return this.userRepository.findAll({ page, skip, take });
  }
}

export default ListUsersService;
