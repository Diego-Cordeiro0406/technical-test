import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { ConsumptionReadings } from '../../types/ConsumptionReadings';

export default { 
  up(queryInterface: QueryInterface) { 
    return queryInterface.createTable<Model<ConsumptionReadings>>('consumptionreadings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      measure_datetime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      measure_type: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    }) 
  }, 
  
  down(queryInterface: QueryInterface) { 
    return queryInterface.dropTable('consumptionreadings') 
  } 
};