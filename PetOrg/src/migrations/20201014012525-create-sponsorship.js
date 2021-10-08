module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sponsorships', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'SET NULL',
    },
    petId: {
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

  down: (queryInterface) => queryInterface.dropTable('sponsorships'),
};
