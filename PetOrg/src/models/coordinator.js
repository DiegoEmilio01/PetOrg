const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const coordinator = sequelize.define('coordinator', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        is: {
          args: [/^[A-zÀ-ú-Z\s]*$/],
          msg: "Solo puede contener letras y espacios",
        },
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        isEmail: {
          msg: "Formato inválido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
  }, {
    hooks: {
      beforeSave: async (coordinator) => {
        if (coordinator.changed('password')) {
          coordinator.password = await bcrypt.hash(coordinator.password, 10);
        }
      }
    }
  });

  coordinator.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    coordinator.hasMany(models.report);
    coordinator.hasMany(models.newsitem);
    coordinator.belongsTo(models.job);
  };

  return coordinator;
};
