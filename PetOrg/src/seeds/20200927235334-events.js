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
    const eventsArray = [];

    eventsArray.push({
      name: 'Sesión de adopción',
      location: 'La casa del Diego',
      start_hour: '14:00',
      end_hour: '17:00',
      description: 'Vamos a estar con unos perritos bien bonitos para que los vayan a adoptar uwu.',
      date:'2022-04-05',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    eventsArray.push({
      name: 'Fiesta de mascotas',
      location: 'La casa del Diego',
      start_hour: '10:00',
      end_hour: '4:00',
      description: 'Una fiesta para que sus mascotas se relajen y vivan la vida loca.',
      date:'2020-03-21',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    eventsArray.push({
      name: 'Búsqueda de mascotas heridas',
      location: 'Cerca de la PUC',
      start_hour: '15:00',
      end_hour: '18:00',
      description: 'Nos reuniremos a buscar mascotas heridas cerca de la universidad para ayudarlas.',
      date:'2022-04-10',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    eventsArray.push({
      name: 'Venta de completos',
      location: 'En la PUC',
      start_hour: '12:30',
      end_hour: '15:00',
      description: 'Estaremos vendiendo completos en la universidad para recaudar fondos.',
      date:'2022-04-12',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert('events', eventsArray);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({tableName: 'events', where: null, options: {truncate: true, cascade: true}});
  },
};
