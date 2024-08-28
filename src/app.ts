import express, { Request, Response } from 'express';

const app = express();

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Aplicação está funcionando!');
});

export default app;