module.exports = (sequelize, DataTypes) => {
  const report = sequelize.define('report', {
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
    location: {
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacía",
        },
      },
    },
    is_closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    coordinatorId: DataTypes.INTEGER,
  }, {});

  report.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    report.belongsTo(models.coordinator);
  };

  return report;
};
