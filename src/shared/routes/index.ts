import { Router } from 'express';
import { productsRouter } from '@modules/products/routes/produts.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';
import { profileRouter } from '@modules/users/routes/profile.routes';
import { customersRouter } from '@modules/customers/routes/customers.routes';
import { ordersRouter } from '@modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/orders', ordersRouter);

export { routes };
