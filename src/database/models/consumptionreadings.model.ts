import { DataTypes, Model, ModelDefined } from 'sequelize';
import db from '.';
import { ConsumptionReadings } from '../../types/ConsumptionReadings';

export type ConsumptionInputtableFields = ConsumptionReadings;

type ConsumptionSequelizeModelCreator = ModelDefined<ConsumptionReadings, ConsumptionInputtableFields>;

export type ConsumptionReadingsSequelizeModel = Model<ConsumptionReadings, ConsumptionSequelizeModelCreator>;

const ConsumptionReadingsModel: ConsumptionSequelizeModelCreator = db.define('ConsumptionReading', {
  measure_uuid: DataTypes.STRING,
  customer_code: DataTypes.STRING,
  image_url: DataTypes.STRING,
  measure_datetime: DataTypes.DATE,
  measure_value: DataTypes.DECIMAL,
  has_confirmed:DataTypes.BOOLEAN,
  measure_type: DataTypes.STRING,
}, {
  tableName: 'consumptionreadings',
  timestamps: false,
  underscored: true,
});
ConsumptionReadingsModel.removeAttribute('id')
export default ConsumptionReadingsModel;