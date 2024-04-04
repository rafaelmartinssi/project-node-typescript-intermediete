import { DataSource } from 'typeorm';
import { CreateProducts1710714805597 } from '@shared/typeorm/migrations/1710714805597-CreateProducts';
import { CreateUsers1711316635135 } from '@shared/typeorm/migrations/1711316635135-CreateUsers';
import { UserTokens1711661823496 } from './migrations/1711661823496-UserTokens';
import { CreateCustomers1711916359359 } from './migrations/1711916359359-CreateCustomers';
import Product from '@modules/products/entities/Product';
import User from '@modules/users/entities/User';
import UserToken from '@modules/users/entities/UserToken';
import Customer from '@modules/customers/entities/Customer';
import { CreateOrders1712018458651 } from './migrations/1712018458651-CreateOrders';
import { CreateOrdersProducts1712020451318 } from './migrations/1712020451318-CreateOrdersProducts';
import Order from '@modules/orders/entities/Order';
import OrdersProducts from '@modules/orders/entities/OrdersProducts';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'apivendas',
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
  migrations: [
    CreateProducts1710714805597,
    CreateUsers1711316635135,
    UserTokens1711661823496,
    CreateCustomers1711916359359,
    CreateOrders1712018458651,
    CreateOrdersProducts1712020451318,
  ],
});

export { dataSource };
