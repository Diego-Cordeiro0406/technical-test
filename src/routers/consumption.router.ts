import { Router } from 'express';

import consumptionController from '../controllers/consumption.controller';

const consumptionRouter = Router();

consumptionRouter.post('/upload', consumptionController.create);

consumptionRouter.patch('/confirm', consumptionController.update);

consumptionRouter.get('/:customer_code/list', consumptionController.findAllByCustomerCode);

export default consumptionRouter;