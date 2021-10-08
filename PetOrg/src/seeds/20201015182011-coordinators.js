'use strict';

const bcrypt = require('bcrypt');

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
    const coordinatorsArray = [];

    const jobs = await queryInterface.sequelize.query(
      "SELECT id FROM jobs"
    );

    coordinatorsArray.push({
      name: 'DEL Labs',
      jobId: jobs[0][0].id,
      email: 'del@uc.cl',
      password: await bcrypt.hash('l3e1d4', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    coordinatorsArray.push({
      name: 'Elías Sabja',
      jobId: jobs[0][1].id,
      email: 'elias.sabja@uc.cl',
      password: await bcrypt.hash('admin', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    coordinatorsArray.push({
      name: 'Lucas Muñoz',
      jobId: jobs[0][1].id,
      email: 'lucas.muoz@uc.cl',
      password: await bcrypt.hash('admin', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    coordinatorsArray.push({
      name: 'Diego Bustamante',
      jobId: jobs[0][1].id,
      email: 'diegobustama@uc.cl',
      password: await bcrypt.hash('admin', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('coordinators', coordinatorsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'coordinators', where: null, options: {truncate: true, cascade: true}});
  }
};
