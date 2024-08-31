import { Op } from 'sequelize';
import ConsumptionReadingsModel, { ConsumptionInputtableFields } from '../database/models/consumptionreadings.model';
import { ConsumptionReadings, ConsumptionReadingsToUpdate, CustomerWithConsumptionReadings, ResponseSuccessUpdate } from '../types/ConsumptionReadings';
import { ServiceResponse } from '../types/ServiceResponse';
import { validateConsumptionToUpdate, validateNewConsumption } from './validations/validationsInputValues';
import CustomerModel from '../database/models/customers.model';

async function checkExistingReading(
  customer_code: string,
  measure_type: string,
  measure_datetime: Date
) {
  const startOfMonth = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1);
  const endOfMonth = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 0);

  return await ConsumptionReadingsModel.findOne({
    where: {
      customer_code,
      measure_type,
      measure_datetime: {
        [Op.between]: [startOfMonth, endOfMonth],
      }
    }
  });
}

async function create(
  consumptionreading: ConsumptionInputtableFields
):Promise<ServiceResponse<ConsumptionReadings>> {
  const {
    customer_code,
    measure_type,
    measure_datetime
  } = consumptionreading

  const error = validateNewConsumption(consumptionreading)

  if (error) return { status: 'INVALID_DATA', data: error };
  const measureDate = new Date(measure_datetime);

  const checking = await checkExistingReading(
    customer_code,
    measure_type,
    measureDate
  )

  if(checking !== null) return {
    status: 'DUPLICATE',
    data: "Leitura do mês já realizada"
  };
  
  const newConsumption = await ConsumptionReadingsModel.create({...consumptionreading,
    measure_datetime: measureDate});

  return { status: 'SUCCESSFUL', data: newConsumption.dataValues };
}

async function update(
  consumptionreadingToUpdate: ConsumptionReadingsToUpdate
):Promise<ServiceResponse<ResponseSuccessUpdate>> {
  const {
    measure_uuid,
    confirmed_value,
  } = consumptionreadingToUpdate

  const error = validateConsumptionToUpdate(consumptionreadingToUpdate)

  if (error) return { status: 'INVALID_DATA', data: error };

  const findConsumptionReadingToUpdate = await ConsumptionReadingsModel.findOne({
    where: {
      measure_uuid
    }
  })

  if(findConsumptionReadingToUpdate === null) return {
    status: 'NOT_FOUND',
    data: "Leitura não encontrada"
  };

  if(findConsumptionReadingToUpdate.dataValues.has_confirmed) return {
    status: 'DUPLICATE',
    data: "Leitura do mês já realizada"
  }
  await ConsumptionReadingsModel.update(
    {
      measure_value: confirmed_value,
      has_confirmed: true
    },
    {
      where: {
        measure_uuid
      }
    }
  )
  return { status: 'SUCCESSFUL', data: {success: true} };
}

async function findAllByCustomerCode(
  customer_code: string,
  measure_type?:string
)
  {
    const whereClause: any = {
      customer_code,
    };
  
    if (measure_type) {
      whereClause.measure_type = measure_type; // Adiciona filtro opcional
    }
  
  const findConsumptionByCustomerCode = await CustomerModel.findOne({
    where: { id: customer_code as 'batata' },
    include: {
      model: ConsumptionReadingsModel,
      as: 'measures',
      attributes: {exclude: ['measure_value', 'customer_code']},
      where: whereClause,
    },
    attributes: {exclude: ['name']}
  })
  if(findConsumptionByCustomerCode === null) return {
    status: 'NOT_FOUND',
    data: "Nenhuma leitura encontrada"
  };
  
  return { status: 'SUCCESSFUL', data: findConsumptionByCustomerCode.dataValues };
}

export default {
  create,
  update,
  findAllByCustomerCode
};