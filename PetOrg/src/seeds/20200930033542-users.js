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
   const usersArray = [];

    usersArray.push({
      name: 'Diego',
      adress: 'Alameda 312',
      email: 'diego@uc.cl',
      password: await bcrypt.hash('admin', 10),
      is_volunteer: false,
      money: 150000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      name: 'Elias',
      adress: 'Av. Colón 595',
      email: 'elias@uc.cl',
      password: await bcrypt.hash('admin', 10),
      is_volunteer: false,
      money: 150000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      name: 'Lucas',
      adress: 'Pasaje Animales 314',
      email: 'lucas@uc.cl',
      password: await bcrypt.hash('admin', 10),
      is_volunteer: false,
      money: 150000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray.push({
      name: 'Pedrito',
      adress: 'Vicuña Mackenna 4860',
      email: 'pedrito@uc.cl',
      password: await bcrypt.hash('admin', 10),
      is_volunteer: false,
      money: 150000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('users', usersArray);
  },






  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'users', where: null, options: {truncate: true, cascade: true}});
  }
};
