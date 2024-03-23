import Product from '@modules/products/entities/Product';

export interface CreateProductDTO {
  name: string;
  price: number;
  quantity: number;
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
  data: Product[];
};

export interface IProductRepository {
  create({ name, price, quantity }: CreateProductDTO): Promise<Product>;
  update(product: Product): Promise<Product>;
  findAll({ page, skip, take }: PaginationParams): Promise<PaginationProps>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  delete(id: string): Promise<void>;
}
