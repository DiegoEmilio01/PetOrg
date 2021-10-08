module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'SET NULL',
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'SET NULL',
    },
    date: {
      type: Sequelize.DATE,
    },
    amount: {
      type: Sequelize.INTEGER,
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

  down: (queryInterface) => queryInterface.dropTable('orders'),
};
