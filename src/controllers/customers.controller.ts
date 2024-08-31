import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import customerService from '../services/customer.service';

async function create(req: Request, res: Response) {
  const { name } = req.body
  const id: string = uuidv4()
  
  const { status, data } = await customerService.create({id, name});

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json({
      error_code: status,
      error_description: data
    });
  }

  res.status(201).json(data);
}

async function deleteCustomer(req: Request, res: Response) {
  const {id} = req.params
  
  const { status, data } = await customerService.deleteCustomer(id);

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json({
      error_code: status,
      error_description: data
    });
  }

  res.status(204).end()
}

export default {
  create,
  deleteCustomer
};