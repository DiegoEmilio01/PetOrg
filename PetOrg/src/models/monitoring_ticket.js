module.exports = (sequelize, DataTypes) => {
  const monitoring_ticket = sequelize.define('monitoring_ticket', {
    photo: DataTypes.STRING,
    petId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    message: DataTypes.STRING,
  }, {});

  monitoring_ticket.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return monitoring_ticket;
};
