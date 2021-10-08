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

    const animalsArray = [];

    animalsArray.push({
      animal: 'Perro',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    animalsArray.push({
      animal: 'Gato',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    animalsArray.push({
      animal: 'Hamster',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    animalsArray.push({
      animal: 'Conejo',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('animals', animalsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'animals', where: null, options: {truncate: true, cascade: true}});
  }
};
