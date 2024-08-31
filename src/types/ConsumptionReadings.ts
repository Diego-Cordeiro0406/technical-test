export type ConsumptionReadings = {
  measure_uuid: string,
  image_url: string,
  customer_code: string,
  measure_datetime: Date
  measure_value: number,
  has_confirmed: boolean,
  measure_type: "WATER" | "GAS"
};

export type ConsumptionReadingsToUpdate = {
  measure_uuid: string,
  confirmed_value: number,
}

export type ResponseSuccessUpdate = {
  success: boolean
}

type ConsumptionReadingWithoutId = Omit<ConsumptionReadings, 'measure_uuid'>

export type CustomerWithConsumptionReadings = {
  customer_code: string,
  measures: ConsumptionReadingWithoutId[]
}
