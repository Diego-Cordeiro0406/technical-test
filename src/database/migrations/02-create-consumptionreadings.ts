import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { ConsumptionReadings } from '../../types/ConsumptionReadings';

export default { 
  up(queryInterface: QueryInterface) { 
    return queryInterface.createTable<Model<ConsumptionReadings>>('consumptionreadings', {
      measure_uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      image_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_code: {
        allowNull: false,
        field: 'customer_code',
        type: DataTypes.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'customers',
          key: 'id',
        },
      },
      measure_datetime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      measure_value: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      has_confirmed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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