import {
  CreateProductDTO,
  IProductRepository,
} from '@modules/products/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ name, price, quantity }: CreateProductDTO) {
    const nameExists = await this.productRepository.findByName(name);
    if (nameExists) {
      throw new AppError('Name alredy used');
    }

    return this.productRepository.create({
      name,
      price,
      quantity,
    });
  }
}

export default CreateProductService;
