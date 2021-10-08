module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('pets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    name: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    sex: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.STRING,
    },
    can_sponsor: {
      type: Sequelize.BOOLEAN,
    },
    description: {
      type: Sequelize.TEXT,
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

  down: (queryInterface) => queryInterface.dropTable('pets'),
};
