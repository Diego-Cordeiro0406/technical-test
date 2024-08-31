import express, { Request, Response } from 'express';
import consumptionRouter from './routers/consumption.router';
import customerRouter from './routers/customer.router';

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(consumptionRouter);
app.use(customerRouter);


app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Aplicação está funcionando!');
});

export default app;