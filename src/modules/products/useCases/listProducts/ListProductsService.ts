import { inject, injectable } from 'tsyringe';
import {
  IProductRepository,
  PaginationProps,
} from '@modules/products/repositories/IProductRepository';

type Params = {
  page: number;
  limit: number;
};

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ page, limit }: Params): Promise<PaginationProps> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    return this.productRepository.findAll({ page, skip, take });
  }
}

export default ListProductsService;
