module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('monitoring_tickets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    photo: {
      type: Sequelize.STRING,
    },
    petId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'pets',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    date: {
      type: Sequelize.DATE,
    },
    message: {
      type: Sequelize.STRING,
      defaultValue: null,
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

  down: (queryInterface) => queryInterface.dropTable('monitoring_tickets'),
};
