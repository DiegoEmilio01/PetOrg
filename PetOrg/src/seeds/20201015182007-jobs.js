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
    const jobsArray = [];

    jobsArray.push({
      name: 'CEO',
      description: 'Jefe de la organización',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jobsArray.push({
      name: 'Coordinador principal',
      description: 'Se encarga de la dirección y seguimiento de las acciones de los demás coordinadores',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jobsArray.push({
      name: 'Encargado de reportes',
      description: 'Está al tanto de responder los reportes y de cerrarlos',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jobsArray.push({
      name: 'Encargado de la tienda',
      description: 'Maneja el stock y productos de la tienda',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('jobs', jobsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'jobs', where: null, options: {truncate: true, cascade: true}});
  }
};
