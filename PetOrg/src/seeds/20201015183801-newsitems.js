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
    const COORDINATOR_NAME = 'DEL Labs';
    const coordinators = await queryInterface.sequelize.query(
      `SELECT id FROM coordinators WHERE name='${COORDINATOR_NAME}'`
    );
    const { id: coordinatorId } = coordinators[0][0];

    const newsitemsArray = [];

    newsitemsArray.push({
      title: 'Cantidad de paseos adecuada para perros',
      content: 'Segun un estudio de la Pontificia Universidad Catolica de Chile, el numero optimo de paseos para perros es de dos veces al dia',
      date: '2020-05-21',
      coordinatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    newsitemsArray.push({
      title: 'Numero de gatos en el pais',
      content: 'Un conteo realizado por el Instituto Nacional del Conteo, estima que en nuestro pais hay aproximadamente un millon de gatos',
      date: '2020-06-15',
      coordinatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    newsitemsArray.push({
      title: 'Plastico en oceanos mata a las tortugas',
      content: 'Hoy nuevamente aparece una tortuga muerta con plastico en los pulmones, ya es la numero cien que aparece este mes',
      date: '2020-08-19',
      coordinatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    newsitemsArray.push({
      title: 'Plastico en oceanos mata a las tortugas parte dos',
      content: 'En los ultimos tres meses se han detectado casos de mas de mil seres vivos en distintas playas con plastico en algun organo interior.',
      date: '2020-08-20',
      coordinatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('newsitems', newsitemsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'newsitems', where: null, options: {truncate: true, cascade: true}});
  }
};
