module.exports = (sequelize, DataTypes) => {
  const assistanceitem = sequelize.define('assistanceitem', {
    userId: {
      type: DataTypes.INTEGER,
      primarykey: true,

    },
    eventId: {
      type: DataTypes.INTEGER,
      primarykey: true,
    }
  }, {});

  assistanceitem.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    assistanceitem.belongsTo(models.user);
    assistanceitem.belongsTo(models.event);
  };

  return assistanceitem;
};
