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
    const reportsArray = [];
    const coordinators = await queryInterface.sequelize.query(
      'SELECT id FROM coordinators'
    );
    const { id: coordinatorId } = coordinators[0][0];

    reportsArray.push({
      name: 'Perro herido',
      location: 'Los Libertadores 2312',
      description: 'Perro herido en el lugar descrito, es totalmente negro y de gran tamaño, se encuentra en la esquina',
      is_closed: 'false',
      date: '2020-05-21',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      name: 'Gato herido',
      location: 'San Juan de la Sierra 2210',
      description: 'Gato herido en el lugar descrito, tiene piel atigrada',
      is_closed: 'true',
      date: '2020-06-30',
      coordinatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      name: 'Perro perdido',
      location: 'Metro Tobalaba',
      description: 'Perro enorme, no conozco la raza pero tiene pelo muy largo y esta deambulando con collar cerca de la entrada del metro',
      is_closed: 'true',
      date: '2020-05-15',
      coordinatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    reportsArray.push({
      name: 'Gato perdido',
      location: 'Soledad 2020',
      description: 'Gato con collar, negro con rayas blancas, lo vi en la calle y se veia perdido',
      is_closed: 'false',
      date: '2020-09-18',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('reports', reportsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'reports', where: null, options: {truncate: true, cascade: true}});
  }
};
