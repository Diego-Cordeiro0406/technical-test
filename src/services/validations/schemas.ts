import Joi from "joi";

export const addConsumption = Joi.object(
    {
    measure_uuid: Joi.string().guid().required(),
    image_url: Joi.string().required(),
    customer_code: Joi.string().guid().required(),
    measure_datetime:Joi.date().required(),
    measure_value: Joi.string().required(),
    has_confirmed:Joi.boolean(),
    measure_type: Joi.string().required(),
  }
)

export const consumptionToUpdate = Joi.object(
  {
    measure_uuid: Joi.string().guid().required(),
    confirmed_value: Joi.number().required(),
  }
)