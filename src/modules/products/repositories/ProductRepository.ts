import { dataSource } from '@shared/typeorm';
import { Repository } from 'typeorm';
import Product from '@modules/products/entities/Product';
import {
  CreateProductDTO,
  IProductRepository,
  PaginationParams,
  PaginationProps,
} from '@modules/products/repositories/IProductRepository';

class ProductRepository implements IProductRepository {
  private dataSource: Repository<Product>;

  public constructor() {
    this.dataSource = dataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: CreateProductDTO): Promise<Product> {
    const product = this.dataSource.create({
      name,
      price,
      quantity,
    });
    return this.dataSource.save(product);
  }

  public async update(product: Product): Promise<Product> {
    return this.dataSource.save(product);
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProps> {
    const [products, count] = await this.dataSource
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    } as PaginationProps;

    return result;
  }

  public async findByName(name: string): Promise<Product | null> {
    return this.dataSource.findOneBy({ name });
  }

  public async findById(id: string): Promise<Product | null> {
    return this.dataSource.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }
}

export default ProductRepository;
