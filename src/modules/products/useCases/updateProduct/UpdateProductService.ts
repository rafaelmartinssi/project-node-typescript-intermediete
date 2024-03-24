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
      throw new AppError('Product not found', 404);
    }

    const productExists = await this.productRepository.findByName(name);
    if (!productExists && name !== product.name) {
      throw new AppError('There is alredy product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return this.productRepository.update(product);
  }
}

export default UpdateProductService;
