module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
      },
    },
    location: {
      type: DataTypes.STRING,
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
    start_hour: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    end_hour: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {});

  event.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    event.belongsToMany(models.user, {
      through: 'assistanceitem',
      foreignKey: 'eventId',
    })
  };

  return event;
};
