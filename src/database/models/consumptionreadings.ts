import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from '.';
import { ConsumptionReadings } from '../../types/ConsumptionReadings';

export type ConsumptionInputtableFields = Optional<ConsumptionReadings, 'id'>;

type ConsumptionSequelizeModelCreator = ModelDefined<ConsumptionReadings, ConsumptionInputtableFields>;

export type ConsumptionReadingsSequelizeModel = Model<ConsumptionReadings, ConsumptionSequelizeModelCreator>;

const ConsumptionReadingsModel: ConsumptionSequelizeModelCreator = db.define('ConsumptionReading', {
  image: DataTypes.STRING,
  customer_code: DataTypes.STRING,
  measure_datetime: DataTypes.DATE,
  measure_type: DataTypes.STRING,
}, {
  tableName: 'consumptionreadings',
  timestamps: false,
  underscored: true,
});

export default ConsumptionReadingsModel;