module.exports = (sequelize, DataTypes) => {
  const job = sequelize.define('job', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puede estar vacío",
        },
        len: {
          args: [3, 32],
          msg: "Debe tener un largo de entre 3 y 32 caracteres",
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
        len: {
          args: [5, 32],
          msg: "Debe tener un largo de entre 5 y 32 caracteres",
        },
      },
    },
  }, {});

  job.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    job.hasMany(models.coordinator);
  };

  return job;
};
