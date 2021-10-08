module.exports = (sequelize, DataTypes) => {
  const animal = sequelize.define('animal', {
    animal: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nombre no puede estar vacío",
        },
      },

    }
  }, {});

  animal.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    animal.hasMany(models.pet);
    
  };

  return animal;
};
