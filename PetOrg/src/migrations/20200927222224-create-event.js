module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('events', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    name: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    start_hour: {
      type: Sequelize.TIME,
    },
    end_hour: {
      type: Sequelize.TIME,
    },
    description: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.DATEONLY,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('events'),
};
