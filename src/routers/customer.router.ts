import { Router } from 'express';

import customerController from '../controllers/customers.controller';

const customerRouter = Router();

customerRouter.post('/customers', customerController.create);

customerRouter.delete('/customers/:id', customerController.deleteCustomer);

export default customerRouter;