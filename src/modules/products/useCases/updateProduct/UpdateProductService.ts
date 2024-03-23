import {
  CreateProductDTO,
  IProductRepository,
} from '@modules/products/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface UpdateProductDTO extends CreateProductDTO {
  id: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id, name, price, quantity }: UpdateProductDTO) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return this.productRepository.update(product);
  }
}

export default UpdateProductService;
