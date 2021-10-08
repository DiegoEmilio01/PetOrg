const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    password: {
      type: DataTypes.STRING(64),
      is: /^[0-9a-f]{64}$/i,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        is: {
          args: [/^[A-zÀ-ú-Z\s]*$/],
          msg: "Nombre solo puede contener letras y espacios",
        },
      },
    },
    is_volunteer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
      },
    },
    money: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: "Debe ser un número entero",
        },
        min: {
          args: [0],
          msg: "Insuficiente para realizar la compra",
        },
      },
    },
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  });

  user.associate = function associate(models) {
    user.hasMany(models.pet);
    user.belongsToMany(models.pet, {
      through: 'sponsorship',
      foreignKey: 'userId',
    });
    user.belongsToMany(models.event, {
      through: 'assistanceitem',
      foreignKey: 'userId',
    });
    user.belongsToMany(models.product, {
      through: 'order',
      foreignKey: 'userId',
    });
  };

  return user;
};
