import { ICustomerRepository } from '@modules/customers/repositories/ICustomerRepository';
import Order from '@modules/orders/entities/Order';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface CreateProductDTO {
  id: string;
  quantity: number;
}

interface CreateOrderDTO {
  customer_id: string;
  products: CreateProductDTO[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    customer_id,
    products,
  }: CreateOrderDTO): Promise<Order> {
    const customer = await this.customerRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const productsIds = products.map(product => product.id);
    const productsFounded =
      await this.productRepository.findAllByIds(productsIds);

    if (!productsFounded.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const productsExistent = productsFounded.map(product => product.id);

    const checkExistentProducts = products.filter(
      product => !productsExistent.includes(product.id),
    );

    if (checkExistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkExistentProducts[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productsFounded.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
          is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsFounded.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.orderRepository.create({
      customer,
      products: serializedProducts,
    });

    return order;
  }
}

export default CreateOrderService;
