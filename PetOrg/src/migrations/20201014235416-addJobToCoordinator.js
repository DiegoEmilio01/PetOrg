'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'coordinators',
      'jobId',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: {
          model: 'jobs',
          key: 'id',
        },
        onDelete: 'SET DEFAULT',
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('coordinators', 'jobId');
  },
};
