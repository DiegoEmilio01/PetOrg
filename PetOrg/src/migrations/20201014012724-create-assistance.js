module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('assistanceitems', {

    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'SET NULL',
    },
    eventId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'SET NULL',
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

  down: (queryInterface) => queryInterface.dropTable('assistanceitems'),
};
