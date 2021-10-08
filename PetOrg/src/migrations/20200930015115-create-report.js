module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('reports', {
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
    description: {
      type: Sequelize.TEXT,
    },
    date: {
      type: Sequelize.DATE,
    },
    is_closed: {
      type: Sequelize.BOOLEAN,
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

  down: (queryInterface) => queryInterface.dropTable('reports'),
};
