import { Router } from 'express';
import { productsRouter } from '@modules/products/routes/produts.routes';

const routes = Router();

routes.use('/products', productsRouter);

export { routes };
