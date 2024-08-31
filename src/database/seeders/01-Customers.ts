import { QueryInterface } from 'sequelize'; 
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('customers', [
      {
        id: "2bcb82b0-1f48-4854-a86c-92366aace80c",
        name: 'Customer 1',
      },
      {
        id: "20da555f-c479-40a5-81d6-1b6c66f480f3",
        name: 'Customer 2',
      },
    ], {});
  },
  
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('customers', {});
  }
};