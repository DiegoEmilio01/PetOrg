'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const productsArray = [];

    productsArray.push({
      name: 'Comida para perros',
      price: 10000,
      used: false,
      stock: 5,
      description: 'Comida rica y muy nutritiva para perros de mediano tamaño.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    productsArray.push({
      name: 'Collar para perros',
      price: 2000,
      used: true,
      stock: 1,
      description: 'Collar rojo para perro pequeño.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    productsArray.push({
      name: 'Peine para gatos',
      price: 3000,
      used: false,
      stock: 3,
      description: 'Peine especial para remover el exceso de pelos de tu gato.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    productsArray.push({
      name: 'Pecera',
      price: 15000,
      used: false,
      stock: 1,
      description: 'Pecera grande: 1 m de largo, 0.5 m de ancho y 0.5 m de alto.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    return queryInterface.bulkInsert('products', productsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'products', where: null, options: {truncate: true, cascade: true}});
  }
};
