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
    const petsArray = [];

    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE name = 'Lucas'"
    );

    const animals = await queryInterface.sequelize.query(
      "SELECT id FROM animals"
    );

    const { id: userId } = users[0][0];

    petsArray.push({
      name: 'Cholito',
      age: 8,
      sex: 'm', // 'm' o 'h'
      size: 'L', // 'S', 'M' o 'L'
      can_sponsor: false,
      description: 'Cholito fue encontrado en el campus SJ. Es muy amigable y hambriento.',
      userId: userId,
      animalId: animals[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    petsArray.push({
      name: 'Ñayki',
      age: 4,
      sex: 'h',
      size: 'M',
      can_sponsor: false,
      description: 'Es una gatita que se encontró en Vicuña Mackenna. Sólo necesita cariño.',
      userId: userId,
      animalId: animals[0][1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    petsArray.push({
      name: 'Cachupín',
      age: 3,
      sex: 'h',
      size: 'S',
      can_sponsor: true,
      description: 'Perrito que le gusta mucho la naturaleza.',
      animalId: animals[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    petsArray.push({
      name: 'Bugs Bunny',
      age: 5,
      sex: 'h',
      size: 'S',
      can_sponsor: true,
      description: 'Conejo que necesita una familia que lo adopte. Es muy activo.',
      animalId: animals[0][3].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  
    return queryInterface.bulkInsert('pets', petsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'pets', where: null, options: {truncate: true, cascade: true}});
  }
};
