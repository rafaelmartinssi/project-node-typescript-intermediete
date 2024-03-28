import { DataSource } from 'typeorm';
import { CreateProducts1710714805597 } from '@shared/typeorm/migrations/1710714805597-CreateProducts';
import { CreateUsers1711316635135 } from '@shared/typeorm/migrations/1711316635135-CreateUsers';
import { UserTokens1711661823496 } from './migrations/1711661823496-UserTokens';
import Product from '@modules/products/entities/Product';
import User from '@modules/users/entities/User';
import UserToken from '@modules/users/entities/UserToken';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'apivendas',
  entities: [Product, User, UserToken],
  migrations: [
    CreateProducts1710714805597,
    CreateUsers1711316635135,
    UserTokens1711661823496,
  ],
});

export { dataSource };
