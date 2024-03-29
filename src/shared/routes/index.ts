import { Router } from 'express';
import { productsRouter } from '@modules/products/routes/produts.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);

export { routes };
