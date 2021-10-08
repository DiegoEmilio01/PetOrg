module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: DataTypes.DATE,
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Cantidad ingresada no corresponde a un número válido",
        },
      },
    },
  }, {});

  order.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
  };

  return order;
};
