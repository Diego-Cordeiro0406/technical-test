import CustomerModel from "../database/models/customers.model";
import { Customer } from "../types/Customers";

async function create(newCustomer: Customer){
  
  const findConsumptionByCustomerCode = await CustomerModel.create(newCustomer)
  
  return { status: 'SUCCESSFUL', data: findConsumptionByCustomerCode.dataValues };
}

async function deleteCustomer(id: string,)
  {
  
  const findCustomer = await CustomerModel.destroy({
    where: {id}
  })
  if(findCustomer === null) return {
    status: 'NOT_FOUND',
    data: "Nenhuma leitura encontrada"
  };
  
  return { status: 'SUCCESSFUL', data: findCustomer };
}

export default {
  create,
  deleteCustomer,
};