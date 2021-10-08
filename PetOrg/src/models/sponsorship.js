module.exports = (sequelize, DataTypes) => {
  const sponsorship = sequelize.define('sponsorship', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    petId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {});

  sponsorship.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };
  return sponsorship;
};
