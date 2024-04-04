import Customer from '@modules/customers/entities/Customer';
import Order from '../entities/Order';

interface CreateProductDTO {
  product_id: string;
  price: number;
  quantity: number;
}

export interface CreateOrderDTO {
  customer: Customer;
  products: CreateProductDTO[];
}

export interface IOrderRepository {
  create({ customer, products }: CreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order | null>;
}
