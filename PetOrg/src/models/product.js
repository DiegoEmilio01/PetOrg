module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        is: {
          args: [/^[A-zÀ-ú-Z0-9 _]*[A-zÀ-ú-Z0-9][A-zÀ-ú-Z0-9 _]*$/],
          msg: "Solo puede contener letras, números y espacios",
        },
      },
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [[true, false]],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        isInt: {
          msg: "Debe ser un número entero"
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        isInt: {
          msg: "Debe ser un número entero",
        },
        min: {
          args: [0],
          msg: "No hay suficientes productos disponibles",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0, 200],
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {});

  product.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    product.belongsToMany(models.user, {
      through: 'order',
      foreignKey: 'productId',
    });
  };

  return product;
};
