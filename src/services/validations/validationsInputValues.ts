import { ConsumptionReadings, ConsumptionReadingsToUpdate } from "../../types/ConsumptionReadings";
import { addConsumption, consumptionToUpdate } from "./schemas";

export const validateNewConsumption = ({
  measure_uuid,
  image_url,
  customer_code,
  measure_datetime,
  measure_value,
  has_confirmed,
  measure_type
}:ConsumptionReadings) => {
  const { error } = addConsumption
    .validate({
      measure_uuid,
      image_url,
      customer_code,
      measure_datetime,
      measure_value,
      has_confirmed,
      measure_type
    });
  if (error) return error.message
};


export const validateConsumptionToUpdate = (
  {
    measure_uuid,
    confirmed_value
}: ConsumptionReadingsToUpdate) => {
  const { error } = consumptionToUpdate.validate({
    measure_uuid,
    confirmed_value
  })
  if (error) return error.message
}