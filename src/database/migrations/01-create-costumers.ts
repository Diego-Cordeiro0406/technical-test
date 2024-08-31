import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { Customer } from '../../types/Customers';

export default { 
  up(queryInterface: QueryInterface) { 
    return queryInterface.createTable<Model<Customer>>('customers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }) 
  }, 
  
  down(queryInterface: QueryInterface) { 
    return queryInterface.dropTable('customers') 
  } 
};