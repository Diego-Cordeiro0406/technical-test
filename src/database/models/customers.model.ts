import { DataTypes, Model, ModelDefined } from 'sequelize';
import db from '.';
import { Customer } from '../../types/Customers';
import ConsumptionReadings from './consumptionreadings.model'

export type CustomerInputtableFields = Customer;

type CustomerSequelizeModelCreator = ModelDefined<Customer, CustomerInputtableFields>;

export type CustomerSequelizeModel = Model<Customer, CustomerSequelizeModelCreator>;

const CustomerModel: CustomerSequelizeModelCreator = db.define('Customers', {
  // id: DataTypes.STRING,
  name: DataTypes.STRING,
}, {
  tableName: 'customers',
  timestamps: false,
  underscored: true,
});
CustomerModel.hasMany(ConsumptionReadings, {foreignKey: 'customer_code', as: 'measures' })

export default CustomerModel;