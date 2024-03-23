import { DataSource } from 'typeorm';
import { CreateProducts1710714805597 } from '@shared/typeorm/migrations/1710714805597-CreateProducts';
import Product from '@modules/products/entities/Product';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'apivendas',
  entities: [Product],
  migrations: [CreateProducts1710714805597],
});

export { dataSource };
